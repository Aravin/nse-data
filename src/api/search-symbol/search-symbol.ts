import axios from "axios";
import { SymbolData } from "./search-symbol.types";
import { config } from "../../common/config";

export const searchSymbol = async (searchKey: string): Promise<SymbolData> => {
    const response = await axios.get(config.baseURL + config.endpoints.searchSymbol + searchKey);

    console.log(response.data);

    return response.data;
}

searchSymbol('HDFC');