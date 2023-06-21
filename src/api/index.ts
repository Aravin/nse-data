import { equityHistory } from "./equity-history/equity-history";
import { equityInfo } from "./equity-info/equity-info";
import { equityOptionChain } from "./equity-option-chain/equity-option-chain";
import { equityQuote } from "./equity-quote/equity-quote";
import { indexDetails } from "./index-details/index-details";
import { indexInfo } from "./index-info/index-info";
import { indexList } from "./index-list/index-list";
import { indexOptionChain } from "./index-option-chain/index-option-chain";
import { marketStatus } from "./market-status/market-status";
import { searchSymbol } from "./search-symbol/search-symbol";

export const nseDataApis = {
    marketStatus,
    searchSymbol,
    equityHistory,
    equityInfo,
    equityOptionChain,
    equityQuote,
    indexDetails,
    indexInfo,
    indexList,
    indexOptionChain,
};

