import { get } from "../../common/http";

export const equityQuote = async (symbol: string) => {
  const url = `/equity-quote/${symbol}`;
  return await get(url);
};
// equityQuote("HDFCBANK");
