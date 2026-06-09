import { Advance, IndexInfo, MarketStatus, Metadata } from "./index-info.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

interface IndexInfoPayload {
  data: IndexInfo["data"];
  marketStatus?: MarketStatus;
  timestamp: string;
}

const buildMetadata = (
  indexName: string,
  payload: IndexInfoPayload,
): Metadata => {
  const marketStatus = payload.marketStatus;

  return {
    indexName,
    open: 0,
    high: 0,
    low: 0,
    previousClose: marketStatus?.last ?? 0,
    last: marketStatus?.last ?? 0,
    percChange: marketStatus?.percentChange ?? 0,
    change: marketStatus?.variation ?? 0,
    timeVal: payload.timestamp,
    yearHigh: 0,
    yearLow: 0,
    totalTradedVolume: 0,
    totalTradedValue: 0,
    ffmc_sum: 0,
  };
};

export const indexInfo = async (indexName: string): Promise<IndexInfo> => {
  const encodedIndexName = encodeURIComponent(indexName);
  const [payload, advance] = await Promise.all([
    get<IndexInfoPayload>(config.endpoints.indexInfo + encodedIndexName),
    get<Advance>(config.endpoints.indexInfoAdvance + encodedIndexName),
  ]);

  return {
    name: indexName,
    advance,
    timestamp: payload.timestamp,
    data: payload.data,
    metadata: buildMetadata(indexName, payload),
    marketStatus: payload.marketStatus ?? {
      market: indexName,
      marketStatus: "Unknown",
      tradeDate: payload.timestamp,
      index: indexName,
      last: 0,
      variation: 0,
      percentChange: 0,
      marketStatusMessage: "",
    },
    date30dAgo: payload.data[0]?.date30dAgo ?? "",
    date365dAgo: payload.data[0]?.date365dAgo ?? "",
  };
};

// indexInfo("NIFTY 50");
