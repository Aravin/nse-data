export const config = {
  baseURL: "https://www.nseindia.com/api",
  endpoints: {
    marketStatus: "/marketStatus",
    searchSymbol: "/search/autocomplete?q=",
    equityInfo: "/equity-meta-info?symbol=",
    equityQuote: "/quote-equity?symbol=",
    equityHistory: "/historical/cm/equity?series=[\"EQ\"]&symbol=",
  },
};
