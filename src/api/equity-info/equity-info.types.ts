export interface EquityInfo {
  symbol: string;
  companyName: string;
  industry: string;
  activeSeries: string[];
  debtSeries: any[];
  tempSuspendedSeries: string[];
  isFNOSec: boolean;
  isCASec: boolean;
  isSLBSec: boolean;
  isDebtSec: boolean;
  isSuspended: boolean;
  isETFSec: boolean;
  isDelisted: boolean;
  isin: string;
}
