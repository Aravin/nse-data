import axios from "axios";
import { MarketState } from "./market-status.types";

export const marketStatus = async (): Promise<MarketState> => {
    const response = await axios.get('https://www.nseindia.com/api/marketStatus');

    console.log(response.data);

    return response.data;
}

marketStatus();