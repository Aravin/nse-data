import { EquityInfo } from "./equity-info.types";
import { SmartSearchEquityResult } from "../search-symbol/search-symbol.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

const buildFallbackEquityInfo = (
  equityName: string,
  result?: SmartSearchEquityResult
): EquityInfo => ({
  symbol: result?.symbol ?? equityName,
  companyName: result?.companyName ?? equityName,
  industry: "",
  activeSeries: result?.series ? [result.series] : [],
  debtSeries: [],
  tempSuspendedSeries: [],
  isFNOSec: false,
  isCASec: false,
  isSLBSec: false,
  isDebtSec: false,
  isSuspended: false,
  isETFSec: false,
  isDelisted: false,
  isin: "",
});

export const equityInfo = async (equityName: string): Promise<EquityInfo> => {
  try {
    return await get<EquityInfo>(
      config.endpoints.equityInfo + encodeURIComponent(equityName)
    );
  } catch {
    const results = await get<SmartSearchEquityResult[]>(
      config.endpoints.searchSymbol + encodeURIComponent(equityName)
    );

    const normalizedEquityName = equityName.trim().toUpperCase();
    const fallbackResult =
      results.find(
        (result) => result.symbol.trim().toUpperCase() === normalizedEquityName
      ) ?? results[0];

    return buildFallbackEquityInfo(equityName, fallbackResult);
  }
};

// equityInfo("HDFCBANK");
