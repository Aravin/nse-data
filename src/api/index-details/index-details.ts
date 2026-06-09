import { IndexDetails } from "./index-details.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexDetails = async (): Promise<IndexDetails> => {
  return get<IndexDetails>(config.endpoints.indexDetails);
};

// indexDetails();
