/**
 * End-to-end tests against the live NSE API.
 *
 * Run with:
 *   npm run test:e2e
 *
 * Requirements:
 *   - Internet access (hits www.nseindia.com directly)
 *   - Tests run sequentially (--runInBand) to respect NSE rate limits
 *
 * All assertions are structural — they check shape and types, not live
 * market values, so they pass regardless of trading session state.
 */

import { nseData } from "../../src";

// ─── Shared test fixtures ─────────────────────────────────────────────────────

/** Stable large-cap equity used for symbol-level endpoints */
const EQUITY = "INFY";
/** Used for equity-stockIndices — note the space, which must be encoded */
const INDEX_NAME = "NIFTY 50";
/** Option-chain indices use the shorter internal name */
const INDEX_OC = "NIFTY";
/** Historical date range in NSE format DD-MM-YYYY (past trading month) */
const FROM_DATE = "01-01-2026";
const TO_DATE = "31-01-2026";

const TIMEOUT = 30_000;

// ─── Session warm-up ──────────────────────────────────────────────────────────
// Trigger the two-step NSE session handshake ONCE before any test runs.
// The redirect-following cookie collection can take up to 30 s; give it 2 min.
beforeAll(async () => {
  await nseData.marketStatus();
}, 120_000);

// 2 s guard between tests to avoid NSE rate-limiting sequential calls
afterEach(() => new Promise<void>((r) => setTimeout(r, 2_000)));

// ─── Market ───────────────────────────────────────────────────────────────────

describe("marketStatus", () => {
  it(
    "GET /api/marketStatus → 200 with non-empty marketState array",
    async () => {
      const result = await nseData.marketStatus();

      expect(result).toHaveProperty("marketState");
      expect(Array.isArray(result.marketState)).toBe(true);
      expect(result.marketState.length).toBeGreaterThan(0);

      const entry = result.marketState[0];
      expect(typeof entry.market).toBe("string");
      expect(typeof entry.marketStatus).toBe("string");
      expect(typeof entry.tradeDate).toBe("string");
    },
    TIMEOUT,
  );
});

// ─── Search ───────────────────────────────────────────────────────────────────

describe("searchSymbol", () => {
  it(
    "GET /api/smart-search/equity?q=INFY → 200 with symbol suggestions",
    async () => {
      const result = await nseData.searchSymbol(EQUITY);

      expect(result).toHaveProperty("symbols");
      expect(Array.isArray(result.symbols)).toBe(true);
      expect(result.symbols.length).toBeGreaterThan(0);

      const first = result.symbols[0];
      expect(typeof first.symbol).toBe("string");
      expect(typeof first.symbol_info).toBe("string");
    },
    TIMEOUT,
  );
});

// ─── Equity ───────────────────────────────────────────────────────────────────

describe("equityInfo", () => {
  it(
    "GET /api/equity-meta-info?symbol=INFY → 200 with company metadata",
    async () => {
      const result = await nseData.equityInfo(EQUITY);

      expect(typeof result.symbol).toBe("string");
      expect(typeof result.companyName).toBe("string");
      expect(typeof result.isin).toBe("string");
      expect(Array.isArray(result.activeSeries)).toBe(true);
      expect(typeof result.isFNOSec).toBe("boolean");
    },
    TIMEOUT,
  );
});

describe("equityQuote", () => {
  it(
    "GET /api/quote-equity?symbol=INFY → 200 with price info",
    async () => {
      const result = await nseData.equityQuote(EQUITY);

      expect(result).toHaveProperty("info");
      expect(result).toHaveProperty("priceInfo");
      expect(result).toHaveProperty("metadata");

      expect(typeof result.info.symbol).toBe("string");
      expect(typeof result.priceInfo.lastPrice).toBe("number");
      expect(typeof result.priceInfo.previousClose).toBe("number");
    },
    TIMEOUT,
  );
});

describe("equityHistory", () => {
  it(
    "GET /api/historical/cm/equity with date range → 200 with data array",
    async () => {
      const result = await nseData.equityHistory(EQUITY, FROM_DATE, TO_DATE);

      expect(result).toHaveProperty("data");
      expect(result).toHaveProperty("meta");
      expect(Array.isArray(result.data)).toBe(true);

      // Data may be empty for public holidays; assert structure when present
      if (result.data.length > 0) {
        const row = result.data[0];
        expect(typeof row.CH_SYMBOL).toBe("string");
        expect(typeof row.CH_CLOSING_PRICE).toBe("number");
        expect(typeof row.CH_TOT_TRADED_QTY).toBe("number");
      }
    },
    TIMEOUT,
  );

  it(
    "GET /api/historical/cm/equity without dates → 200, no empty from/to params",
    async () => {
      const result = await nseData.equityHistory(EQUITY);

      expect(result).toHaveProperty("data");
      expect(Array.isArray(result.data)).toBe(true);
    },
    TIMEOUT,
  );
});

describe("equityOptionChain", () => {
  it(
    "GET /api/option-chain-equities?symbol=INFY → 200 with records and filtered",
    async () => {
      const result = await nseData.equityOptionChain(EQUITY);

      expect(result).toHaveProperty("records");
      expect(result).toHaveProperty("filtered");
      expect(Array.isArray(result.records.data)).toBe(true);
      expect(Array.isArray(result.records.expiryDates)).toBe(true);
      expect(typeof result.records.underlyingValue).toBe("number");
      expect(typeof result.filtered.CE.totOI).toBe("number");
    },
    TIMEOUT,
  );
});

// ─── Index ────────────────────────────────────────────────────────────────────

describe("indexDetails", () => {
  it(
    "GET /api/allIndices → 200 with all-indices list",
    async () => {
      const result = await nseData.indexDetails();

      expect(result).toHaveProperty("data");
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);

      const first = result.data[0];
      expect(typeof first.index).toBe("string");
      expect(typeof first.indexSymbol).toBe("string");
      expect(typeof first.last).toBe("number");
    },
    TIMEOUT,
  );
});

describe("indexInfo", () => {
  it(
    "GET /api/equity-stock-indices?index=NIFTY%2050 → 200 with constituent data",
    async () => {
      const result = await nseData.indexInfo(INDEX_NAME);

      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("advance");
      expect(result).toHaveProperty("data");
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);

      const stock = result.data[0];
      expect(typeof stock.symbol).toBe("string");
      expect(typeof stock.lastPrice).toBe("number");
    },
    TIMEOUT,
  );
});

describe("indexList", () => {
  it(
    "GET /api/index-names → 200 with stn and nts arrays",
    async () => {
      const result = await nseData.indexList();

      expect(result).toHaveProperty("stn");
      expect(result).toHaveProperty("nts");
      expect(Array.isArray(result.stn)).toBe(true);
      expect(Array.isArray(result.nts)).toBe(true);
      expect(result.stn.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );
});

describe("indexOptionChain", () => {
  it(
    "GET /api/option-chain-contract-info?symbol=NIFTY → 200 with contract metadata mapped to the legacy shape",
    async () => {
      const result = await nseData.indexOptionChain(INDEX_OC);

      expect(result).toHaveProperty("records");
      expect(result).toHaveProperty("filtered");
      expect(Array.isArray(result.records.data)).toBe(true);
      expect(Array.isArray(result.records.expiryDates)).toBe(true);
      expect(result.records.expiryDates.length).toBeGreaterThan(0);
      expect(Array.isArray(result.records.strikePrices)).toBe(true);
      expect(result.records.strikePrices.length).toBeGreaterThan(0);
      expect(typeof result.records.underlyingValue).toBe("number");
      expect(typeof result.filtered.CE.totOI).toBe("number");
    },
    TIMEOUT,
  );
});
