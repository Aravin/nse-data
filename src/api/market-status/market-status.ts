import axios from "axios";
import { MarketState } from "./market-status.types";
import { config } from "../../common/config";

export const marketStatus = async (): Promise<MarketState> => {
    const response = await axios.get(config.baseURL + config.endpoints.marketStatus);

    console.log(response.data);

    return response.data;
}

marketStatus();