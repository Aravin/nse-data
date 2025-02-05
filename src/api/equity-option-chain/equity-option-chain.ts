import { EquityOptionChain } from "./equity-option-chain.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const equityOptionChain = async (equityName: string): Promise<EquityOptionChain> => {
  return await get(
    `${config.endpoints.equityOptionChain}${equityName}`
  );
};

// equityOptionChain("TCS");
