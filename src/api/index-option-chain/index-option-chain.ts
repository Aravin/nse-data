import { IndexOptionChain } from "./index-option-chain.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

interface ContractInfoResponse {
  expiryDates: string[];
  strikePrice: string[];
}

export const indexOptionChain = async (indexName: string): Promise<IndexOptionChain> => {
  const contractInfo = await get<ContractInfoResponse>(
    config.endpoints.indexOptionChain + encodeURIComponent(indexName),
  );

  return {
    records: {
      expiryDates: contractInfo.expiryDates,
      data: [],
      timestamp: new Date().toISOString(),
      underlyingValue: 0,
      strikePrices: contractInfo.strikePrice
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value)),
    },
    filtered: {
      data: [],
      CE: { totOI: 0, totVol: 0 },
      PE: { totOI: 0, totVol: 0 },
    },
  };
};

// indexOptionChain("NIFTY");
