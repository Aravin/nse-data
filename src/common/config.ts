export const config = {
  baseURL: "https://www.nseindia.com/api",
  endpoints: {
    marketStatus: "/marketStatus",
    searchSymbol: "/smart-search/equity?q=",
    equityInfo: "/equity-meta-info?symbol=",
    equityQuote: "/quote-equity?symbol=",
    equityHistory: "/historical/cm/equity?series=[\"EQ\"]&symbol=",
    equityOptionChain: "/option-chain-equities?symbol=",
    indexOptionChain: "/option-chain-contract-info?symbol=",
    indexInfo: "/equity-stock-indices?index=",
    indexInfoAdvance: "/equity-stockIndices-adu?index=",
    indexList: "/index-names",
    indexDetails: "/allIndices",
  },
};
