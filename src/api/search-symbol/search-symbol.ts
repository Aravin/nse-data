import {
  ActiveSery,
  ResultSubType,
  ResultType,
  SmartSearchEquityResult,
  Symbol,
  SymbolData,
} from "./search-symbol.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

const toLegacySymbol = (entry: SmartSearchEquityResult): Symbol => ({
  symbol: entry.symbol,
  symbol_info: entry.companyName,
  symbol_suggest: [{ input: entry.companyName, weight: 1 }],
  result_type: ResultType.Symbol,
  result_sub_type: ResultSubType.Equity,
  activeSeries: entry.series === ActiveSery.W1 ? [ActiveSery.W1] : [ActiveSery.Eq],
  url: entry.url,
});

export const searchSymbol = async (symbol: string): Promise<SymbolData> => {
  const results = await get<SmartSearchEquityResult[]>(
    config.endpoints.searchSymbol + encodeURIComponent(symbol),
  );

  return {
    symbols: results.map(toLegacySymbol),
    mfsymbols: [],
    search_content: [],
    sitemap: [],
  };
};

// searchSymbol("HDFC");
