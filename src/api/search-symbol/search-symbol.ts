import { get } from "../../common/http";

export const searchSymbol = async (symbol: string) => {
  const url = `/search-symbol/${symbol}`;
  return await get(url);
};

// searchSymbol("HDFC");
