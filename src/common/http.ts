import { config } from "./config";

// ─── Typed error ──────────────────────────────────────────────────────────────

export class NseApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly endpoint: string,
    message?: string
  ) {
    super(message ?? `NSE API responded with ${status} for ${endpoint}`);
    this.name = "NseApiError";
    // Ensure instanceof checks work correctly when transpiling to older targets
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ─── Headers ──────────────────────────────────────────────────────────────────

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const HOME_HEADERS: Record<string, string> = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

// NSE / Akamai validate all of these for XHR-style API calls
const API_HEADERS: Record<string, string> = {
  "User-Agent": UA,
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nseindia.com/",
  "X-Requested-With": "XMLHttpRequest",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
};

const REQUEST_TIMEOUT_MS = 15_000;

// ─── Cookie helpers ───────────────────────────────────────────────────────────

type HeadersExt = Headers & { getSetCookie?: () => string[] };

function extractSetCookies(headers: Headers): string[] {
  const fn = (headers as HeadersExt).getSetCookie;
  if (typeof fn === "function") return fn.call(headers);
  return (headers.get("set-cookie") ?? "")
    .split(/,\s*(?=[a-zA-Z_][a-zA-Z0-9_%-]+=)/)
    .filter(Boolean);
}

/** Merge cookie strings; later values win for duplicate names. */
function mergeCookies(...parts: string[]): string {
  const map = new Map<string, string>();
  for (const part of parts) {
    for (const kv of part.split("; ")) {
      const eq = kv.indexOf("=");
      if (eq !== -1) map.set(kv.slice(0, eq), kv.slice(eq + 1));
    }
  }
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

function createTimeoutSignal(timeoutMs: number): {
  controller: AbortController;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    controller,
    cleanup: () => clearTimeout(timeoutId),
  };
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS
): Promise<Response> {
  const { controller, cleanup } = createTimeoutSignal(timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new NseApiError(408, url, `Request timed out after ${timeoutMs}ms`);
    }

    throw error;
  } finally {
    cleanup();
  }
}

async function discardResponse(response: Response): Promise<void> {
  await response.body?.cancel();
}

// ─── Manual redirect follower ─────────────────────────────────────────────────
// Node.js `fetch` with `redirect: "follow"` only exposes Set-Cookie from the
// FINAL response. Akamai and NSE set critical validation cookies on intermediate
// redirect hops. We must follow redirects manually to collect ALL cookies.

async function fetchCollectingCookies(
  startUrl: string,
  headers: Record<string, string>
): Promise<string> {
  const cookieMap = new Map<string, string>();
  let url = startUrl;

  for (let hop = 0; hop < 10; hop++) {
    const currentCookies = [...cookieMap.entries()]
      .map(([k, v]) => `${k}=${v}`)
      .join("; ");

    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        ...headers,
        ...(currentCookies ? { Cookie: currentCookies } : {}),
      },
      redirect: "manual",
    });

    try {
      // Accumulate Set-Cookie from this hop
      for (const raw of extractSetCookies(res.headers)) {
        const kv = raw.split(";")[0].trim();
        const eq = kv.indexOf("=");
        if (eq !== -1) cookieMap.set(kv.slice(0, eq), kv.slice(eq + 1));
      }

      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location") ?? "";
        if (!loc) break;
        url = loc.startsWith("http") ? loc : new URL(loc, url).href;
        continue;
      }

      break; // non-redirect: done
    } finally {
      await discardResponse(res);
    }
  }

  return [...cookieMap.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

// ─── Session / cookie priming ─────────────────────────────────────────────────
// NSE uses Akamai Bot Manager. A two-step warm-up is required:
//   1. Homepage  → base session cookies (nsit, nseappid, AKA_A2, bm_* …)
//   2. Market-data page → Akamai validates the session for API access
// We follow redirects manually at each step to capture all Set-Cookie headers.

const SESSION_TTL_MS = 3 * 60 * 1000; // 3 minutes
const session = { cookies: "", expiresAt: 0 };

async function refreshSession(): Promise<void> {
  // Step 1: homepage (follow all redirect hops to collect every cookie)
  const homeCookies = await fetchCollectingCookies(
    "https://www.nseindia.com/",
    HOME_HEADERS
  );

  // Step 2: market-data page with homepage cookies
  const warmCookies = await fetchCollectingCookies(
    "https://www.nseindia.com/market-data/live-equity-market",
    {
      ...HOME_HEADERS,
      Referer: "https://www.nseindia.com/",
      ...(homeCookies ? { Cookie: homeCookies } : {}),
    }
  );

  session.cookies = mergeCookies(homeCookies, warmCookies);
  session.expiresAt = Date.now() + SESSION_TTL_MS;
}

async function ensureSession(): Promise<void> {
  if (Date.now() >= session.expiresAt) {
    await refreshSession();
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ─── Public GET helper ────────────────────────────────────────────────────────

const MAX_RETRIES = 3;

export const get = async <T = unknown>(url: string): Promise<T> => {
  await ensureSession();
  const fullUrl = `${config.baseURL}${url}`;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetchWithTimeout(fullUrl, {
      method: "GET",
      headers: { ...API_HEADERS, Cookie: session.cookies },
    });

    try {
      // Auth failures: refresh session and retry with back-off
      if (res.status === 401 || res.status === 403) {
        if (attempt < MAX_RETRIES - 1) {
          await refreshSession();
          await delay(1000 * (attempt + 1));
          continue;
        }
        throw new NseApiError(
          res.status,
          fullUrl,
          `Authentication failed after ${MAX_RETRIES} attempts`
        );
      }

      // Transient server errors: back-off and retry
      if (res.status === 429 || res.status === 503 || res.status === 502) {
        if (attempt === MAX_RETRIES - 1) {
          throw new NseApiError(
            res.status,
            fullUrl,
            `Request failed with ${res.status} after ${MAX_RETRIES} attempts`
          );
        }

        const retryAfterSec =
          res.status === 429
            ? Number(res.headers.get("retry-after") ?? "2")
            : 2;
        await delay(
          (Number.isFinite(retryAfterSec) ? retryAfterSec : 2) * 1000
        );
        continue;
      }

      if (!res.ok) {
        throw new NseApiError(res.status, fullUrl);
      }

      const data = (await res.json()) as T;

      // NSE returns {} (empty object) on some endpoints when the session has
      // expired. Treat as a soft auth failure and retry with a fresh session.
      if (
        data !== null &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        Object.keys(data as Record<string, unknown>).length === 0 &&
        attempt < MAX_RETRIES - 1
      ) {
        await refreshSession();
        await delay(1000 * (attempt + 1));
        continue;
      }

      return data;
    } finally {
      if (res.body && !res.body.locked) {
        await discardResponse(res);
      }
    }
  }

  throw new NseApiError(
    0,
    fullUrl,
    `Request failed after ${MAX_RETRIES} attempts`
  );
};
