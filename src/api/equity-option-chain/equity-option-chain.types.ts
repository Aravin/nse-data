export interface EquityOptionChain {
  records:  Records;
  filtered: Filtered;
}

export interface Filtered {
  data: Datum[];
  CE:   FilteredCE;
  PE:   FilteredCE;
}

export interface FilteredCE {
  totOI:  number;
  totVol: number;
}

export interface Datum {
  strikePrice: number;
  expiryDate:  string;
  CE?:         DatumCE;
  PE?:         DatumCE;
}

export interface DatumCE {
  strikePrice:           number;
  expiryDate:            string;
  underlying:            string;
  identifier:            string;
  openInterest:          number;
  changeinOpenInterest:  number;
  pchangeinOpenInterest: number;
  totalTradedVolume:     number;
  impliedVolatility:     number;
  lastPrice:             number;
  change:                number;
  pChange:               number;
  totalBuyQuantity:      number;
  totalSellQuantity:     number;
  bidQty:                number;
  bidprice:              number;
  askQty:                number;
  askPrice:              number;
  underlyingValue:       number;
}

export interface Records {
  expiryDates:     string[];
  data:            Datum[];
  timestamp:       string;
  underlyingValue: number;
  strikePrices:    number[];
}
