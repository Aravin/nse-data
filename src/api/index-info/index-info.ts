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
  payload: IndexInfoPayload
): Metadata => {
  const marketStatus = payload.marketStatus;
  const last = Number(marketStatus?.last ?? 0);
  const change = Number(marketStatus?.variation ?? 0);
  const percChange = Number(marketStatus?.percentChange ?? 0);

  return {
    indexName,
    open: 0,
    high: 0,
    low: 0,
    previousClose: last - change,
    last,
    percChange,
    change,
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
  const data = Array.isArray(payload.data) ? payload.data : [];

  return {
    name: indexName,
    advance,
    timestamp: payload.timestamp,
    data,
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
    date30dAgo: data[0]?.date30dAgo ?? "",
    date365dAgo: data[0]?.date365dAgo ?? "",
  };
};

// indexInfo("NIFTY 50");
