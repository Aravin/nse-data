import { MarketState } from "./market-status.types";
import { get } from "../../common/http";
import { config } from "../../common/config";

export const marketStatus = async (): Promise<MarketState> => {
  return get<MarketState>(config.endpoints.marketStatus);
};

// marketStatus();
