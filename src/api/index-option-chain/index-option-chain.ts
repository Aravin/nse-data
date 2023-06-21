import { IndexOptionChain } from "./index-option-chain.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const indexOptionChain = async (indexName: string): Promise<IndexOptionChain> => {
  return await get(
    `${config.baseURL}${config.endpoints.indexOptionChain}${indexName}`
  );
};

// indexOptionChain("NIFTY");
