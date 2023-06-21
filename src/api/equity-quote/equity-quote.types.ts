export interface EquityQuote {
  info: Info;
  metadata: Metadata;
  securityInfo: SecurityInfo;
  sddDetails: SddDetails;
  priceInfo: PriceInfo;
  industryInfo: IndustryInfo;
  preOpenMarket: PreOpenMarket;
}

export interface IndustryInfo {
  macro: string;
  sector: string;
  industry: string;
  basicIndustry: string;
}

export interface Info {
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
  isTop10: boolean;
  identifier: string;
}

export interface Metadata {
  series: string;
  symbol: string;
  isin: string;
  status: string;
  listingDate: string;
  industry: string;
  lastUpdateTime: string;
  pdSectorPe: number;
  pdSymbolPe: number;
  pdSectorInd: string;
}

export interface PreOpenMarket {
  preopen: Preopen[];
  ato: Ato;
  IEP: number;
  totalTradedVolume: number;
  finalPrice: number;
  finalQuantity: number;
  lastUpdateTime: string;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  atoBuyQty: number;
  atoSellQty: number;
}

export interface Ato {
  buy: number;
  sell: number;
}

export interface Preopen {
  price: number;
  buyQty: number;
  sellQty: number;
  iep?: boolean;
}

export interface PriceInfo {
  lastPrice: number;
  change: number;
  pChange: number;
  previousClose: number;
  open: number;
  close: number;
  vwap: number;
  lowerCP: string;
  upperCP: string;
  pPriceBand: string;
  basePrice: number;
  intraDayHighLow: IntraDayHighLow;
  weekHighLow: WeekHighLow;
  iNavValue: null;
  checkINAV: boolean;
}

export interface IntraDayHighLow {
  min: number;
  max: number;
  value: number;
}

export interface WeekHighLow {
  min: number;
  minDate: string;
  max: number;
  maxDate: string;
  value: number;
}

export interface SddDetails {
  SDDAuditor: string;
  SDDStatus: string;
}

export interface SecurityInfo {
  boardStatus: string;
  tradingStatus: string;
  tradingSegment: string;
  sessionNo: string;
  slb: string;
  classOfShare: string;
  derivatives: string;
  surveillance: Surveillance;
  faceValue: number;
  issuedSize: number;
}

export interface Surveillance {
  surv: null;
  desc: null;
}
