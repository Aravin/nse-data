export interface EquityHistory {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  _id:                   string;
  CH_SYMBOL:             string;
  CH_SERIES:             Series;
  CH_MARKET_TYPE:        ChMarketType;
  CH_TRADE_HIGH_PRICE:   number;
  CH_TRADE_LOW_PRICE:    number;
  CH_OPENING_PRICE:      number;
  CH_CLOSING_PRICE:      number;
  CH_LAST_TRADED_PRICE:  number;
  CH_PREVIOUS_CLS_PRICE: number;
  CH_TOT_TRADED_QTY:     number;
  CH_TOT_TRADED_VAL:     number;
  CH_52WEEK_HIGH_PRICE:  number;
  CH_52WEEK_LOW_PRICE:   number;
  CH_TOTAL_TRADES:       number;
  CH_ISIN:               String;
  CH_TIMESTAMP:          Date;
  TIMESTAMP:             Date;
  createdAt:             Date;
  updatedAt:             Date;
  __v:                   number;
  SLBMH_TOT_VAL:         null;
  VWAP:                  number;
  mTIMESTAMP:            string;
}

export enum ChMarketType {
  N = "N",
}

export enum Series {
  Eq = "EQ",
}

export interface Meta {
  series:   Series[];
  fromDate: string;
  toDate:   string;
  symbols:  string[];
}
