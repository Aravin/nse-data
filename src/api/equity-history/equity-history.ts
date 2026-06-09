import { EquityHistory, Series } from "./equity-history.types";
import { get } from "../../common/http";

// Date format expected by NSE: DD-MM-YYYY (e.g. "14-06-2023")
export const equityHistory = async (
  equityName: string,
  startDate?: string,
  endDate?: string,
): Promise<EquityHistory> => {
  // Build URL without emitting empty from/to params; NSE returns 400 for blank values
  let url = `/historical/cm/equity?series=["EQ"]&symbol=${encodeURIComponent(equityName)}`;
  if (startDate) url += `&from=${encodeURIComponent(startDate)}`;
  if (endDate) url += `&to=${encodeURIComponent(endDate)}`;

  try {
    return await get<EquityHistory>(url);
  } catch {
    return {
      data: [],
      meta: {
        series: [Series.Eq],
        fromDate: startDate ?? "",
        toDate: endDate ?? "",
        symbols: [equityName],
      },
    };
  }
};

// equityHistory("TCS");
// equityHistory("TCS", "14-06-2023", "21-06-2023");
