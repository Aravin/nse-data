import { EquityOptionChain } from "./equity-option-chain.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

const emptyOptionChain = (): EquityOptionChain => ({
  records: {
    expiryDates: [],
    data: [],
    timestamp: new Date().toISOString(),
    underlyingValue: 0,
    strikePrices: [],
  },
  filtered: {
    data: [],
    CE: { totOI: 0, totVol: 0 },
    PE: { totOI: 0, totVol: 0 },
  },
});

const isEquityOptionChain = (value: unknown): value is EquityOptionChain =>
  Boolean(value && typeof value === "object") &&
  Array.isArray((value as EquityOptionChain).records?.expiryDates) &&
  Array.isArray((value as EquityOptionChain).records?.data) &&
  Array.isArray((value as EquityOptionChain).records?.strikePrices) &&
  Array.isArray((value as EquityOptionChain).filtered?.data) &&
  typeof (value as EquityOptionChain).filtered?.CE?.totOI === "number" &&
  typeof (value as EquityOptionChain).filtered?.CE?.totVol === "number" &&
  typeof (value as EquityOptionChain).filtered?.PE?.totOI === "number" &&
  typeof (value as EquityOptionChain).filtered?.PE?.totVol === "number";

export const equityOptionChain = async (
  equityName: string
): Promise<EquityOptionChain> => {
  try {
    const result = await get<unknown>(
      config.endpoints.equityOptionChain + encodeURIComponent(equityName)
    );

    if (isEquityOptionChain(result)) {
      return result;
    }

    return emptyOptionChain();
  } catch {
    return emptyOptionChain();
  }
};

// equityOptionChain("TCS");
