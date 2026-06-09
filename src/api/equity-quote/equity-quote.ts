import { EquityQuote } from "./equity-quote.types";
import { SmartSearchEquityResult } from "../search-symbol/search-symbol.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

const buildFallbackQuote = (
  symbol: string,
  result?: SmartSearchEquityResult,
): EquityQuote => {
  const companyName = result?.companyName ?? symbol;
  const lastPrice = result?.lastPrice ?? 0;
  const change = result?.change ?? 0;
  const pChange = result?.pChange ?? 0;
  const previousClose = lastPrice - change;
  const series = result?.series ?? "EQ";
  const timestamp = new Date().toISOString();

  return {
    info: {
      symbol: result?.symbol ?? symbol,
      companyName,
      industry: "",
      activeSeries: [series],
      debtSeries: [],
      tempSuspendedSeries: [],
      isFNOSec: false,
      isCASec: false,
      isSLBSec: false,
      isDebtSec: false,
      isSuspended: false,
      isETFSec: false,
      isDelisted: false,
      isin: "",
      isTop10: false,
      identifier: result?.symbol ?? symbol,
    },
    metadata: {
      series,
      symbol: result?.symbol ?? symbol,
      isin: "",
      status: "Active",
      listingDate: "",
      industry: "",
      lastUpdateTime: timestamp,
      pdSectorPe: 0,
      pdSymbolPe: 0,
      pdSectorInd: "",
    },
    securityInfo: {
      boardStatus: "",
      tradingStatus: "",
      tradingSegment: result?.segment ?? "",
      sessionNo: "",
      slb: "",
      classOfShare: "",
      derivatives: "",
      surveillance: { surv: null, desc: null },
      faceValue: 0,
      issuedSize: 0,
    },
    sddDetails: {
      SDDAuditor: "",
      SDDStatus: "",
    },
    priceInfo: {
      lastPrice,
      change,
      pChange,
      previousClose,
      open: previousClose,
      close: lastPrice,
      vwap: lastPrice,
      lowerCP: "0",
      upperCP: "0",
      pPriceBand: "0",
      basePrice: previousClose,
      intraDayHighLow: { min: lastPrice, max: lastPrice, value: lastPrice },
      weekHighLow: {
        min: lastPrice,
        minDate: "",
        max: lastPrice,
        maxDate: "",
        value: lastPrice,
      },
      iNavValue: null,
      checkINAV: false,
    },
    industryInfo: {
      macro: "",
      sector: "",
      industry: "",
      basicIndustry: "",
    },
    preOpenMarket: {
      preopen: [],
      ato: { buy: 0, sell: 0 },
      IEP: 0,
      totalTradedVolume: 0,
      finalPrice: lastPrice,
      finalQuantity: 0,
      lastUpdateTime: timestamp,
      totalBuyQuantity: 0,
      totalSellQuantity: 0,
      atoBuyQty: 0,
      atoSellQty: 0,
    },
  };
};

export const equityQuote = async (symbol: string): Promise<EquityQuote> => {
  try {
    return await get<EquityQuote>(
      config.endpoints.equityQuote + encodeURIComponent(symbol),
    );
  } catch {
    const results = await get<SmartSearchEquityResult[]>(
      config.endpoints.searchSymbol + encodeURIComponent(symbol),
    );

    return buildFallbackQuote(symbol, results[0]);
  }
};
// equityQuote("HDFCBANK");
