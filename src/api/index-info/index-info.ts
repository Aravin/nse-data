import { IndexInfo } from "./index-info.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexInfo = async (equityName: string): Promise<IndexInfo> => {
  return await get(
    config.baseURL + config.endpoints.indexInfo + equityName
  );
};

// indexInfo("NIFTY 50");
