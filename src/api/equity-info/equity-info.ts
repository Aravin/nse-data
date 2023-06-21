import axios from "axios";
import { EquityInfo } from "./equity-info.types";
import { config } from "../../common/config";

export const equityInfo = async (equityName: string): Promise<EquityInfo> => {
    const response = await axios.get(config.baseURL + config.endpoints.equityInfo + equityName);

    console.log(response.data);

    return response.data;
}

equityInfo('HDFCBANK');
