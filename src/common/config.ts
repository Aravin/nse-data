export const config = {
  baseURL: "https://www.nseindia.com/api",
  endpoints: {
    marketStatus: "/marketStatus",
    searchSymbol: "/search/autocomplete?q=",
    equityInfo: "/equity-meta-info?symbol=",
    equityQuote: "/quote-equity?symbol=",
    equityHistory: "/historical/cm/equity?series=[\"EQ\"]&symbol=",
    equityOptionChain: "/option-chain-equities?symbol=",
    indexOptionChain: "/option-chain-indices?symbol=",
    indexInfo: "/equity-stockIndices?index=",
    indexList: "/index-names",
    indexDetails: "/allIndices",
  },
};
