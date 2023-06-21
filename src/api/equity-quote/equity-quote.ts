import axios from "axios";
import { EquityQuote } from "./equity-quote.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const equityQuote = async (equityName: string): Promise<EquityQuote> => {
  return await get(
    config.baseURL + config.endpoints.equityQuote + equityName
  );
};

// equityQuote("HDFCBANK");
