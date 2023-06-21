import { MarketState } from "./market-status.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const marketStatus = async (): Promise<MarketState> => {
  return await get(
    config.baseURL + config.endpoints.marketStatus
  );
};

// marketStatus();
