import { EquityInfo } from "./equity-info.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const equityInfo = async (equityName: string): Promise<EquityInfo> => {
  return await get(
    config.baseURL + config.endpoints.equityInfo + equityName
  );
};

// equityInfo("HDFCBANK");
