import { IndexDetails } from "./index-details.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexList = async (): Promise<IndexDetails> => {
  return await get(
    config.baseURL + config.endpoints.indexDetails
  );
};

indexList();
