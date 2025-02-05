import { IndexInfo } from "./index-info.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexInfo = async (indexName: string): Promise<IndexInfo> => {
  return await get(config.endpoints.indexInfo + indexName);
};

// indexInfo("NIFTY 50");
