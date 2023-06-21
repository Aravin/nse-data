import { IndexList } from "./index-list.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexList = async (): Promise<IndexList> => {
  return await get(
    config.baseURL + config.endpoints.indexList
  );
};

// indexList();
