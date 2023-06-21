import { EquityHistory } from "./equity-history.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const equityHistory = async (equityName: string, startDate?: string, endDate?: string): Promise<EquityHistory> => {
  return await get(
    `${config.baseURL}${config.endpoints.equityHistory}${equityName}&from=${startDate || ''}&to=${endDate || ''}`
  );
};

// equityHistory("TCS");
// equityHistory("TCS", "14-06-2023", "21-06-2023");
