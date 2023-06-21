import axios from "axios";
import { SymbolData } from "./search-symbol.types";
import { config } from "../../common/config";
import { get } from "../../common/http";

export const searchSymbol = async (searchKey: string): Promise<SymbolData> => {
  return await get(
    config.baseURL + config.endpoints.searchSymbol + searchKey
  );
};

// searchSymbol("HDFC");
