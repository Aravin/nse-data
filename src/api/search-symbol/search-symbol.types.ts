export interface SymbolData {
  symbols: Symbol[];
  mfsymbols: any[];
  search_content: any[];
  sitemap: any[];
}

export interface Symbol {
  symbol: string;
  symbol_info: string;
  symbol_suggest: SymbolSuggest[];
  result_type: ResultType;
  result_sub_type: ResultSubType;
  activeSeries: ActiveSery[];
  url: string;
}

export enum ActiveSery {
  Eq = "EQ",
  W1 = "W1",
}

export enum ResultSubType {
  Equity = "equity",
}

export enum ResultType {
  Symbol = "symbol",
}

export interface SymbolSuggest {
  input: string;
  weight: number;
}
