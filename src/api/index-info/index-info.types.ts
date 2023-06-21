export interface IndexInfo {
  name:         string;
  advance:      Advance;
  timestamp:    string;
  data:         Datum[];
  metadata:     Metadata;
  marketStatus: MarketStatus;
  date30dAgo:   string;
  date365dAgo:  string;
}

export interface Advance {
  declines:  string;
  advances:  string;
  unchanged: string;
}

export interface Datum {
  priority:          number;
  symbol:            string;
  identifier:        string;
  open:              number;
  dayHigh:           number;
  dayLow:            number;
  lastPrice:         number;
  previousClose:     number;
  change:            number;
  pChange:           number;
  ffmc:              number;
  yearHigh:          number;
  yearLow:           number;
  totalTradedVolume: number;
  totalTradedValue:  number;
  lastUpdateTime:    string;
  nearWKH:           number;
  nearWKL:           number;
  perChange365d:     number;
  date365dAgo:       string;
  chart365dPath:     string;
  date30dAgo:        string;
  perChange30d:      number;
  chart30dPath:      string;
  chartTodayPath:    string;
  series?:           string;
  meta?:             Meta;
}

export interface Meta {
  symbol:              string;
  companyName:         string;
  industry?:           string;
  activeSeries:        string[];
  debtSeries:          string[];
  tempSuspendedSeries: string[];
  isFNOSec:            boolean;
  isCASec:             boolean;
  isSLBSec:            boolean;
  isDebtSec:           boolean;
  isSuspended:         boolean;
  isETFSec:            boolean;
  isDelisted:          boolean;
  isin:                string;
}

export interface MarketStatus {
  market:              string;
  marketStatus:        string;
  tradeDate:           string;
  index:               string;
  last:                number;
  variation:           number;
  percentChange:       number;
  marketStatusMessage: string;
}

export interface Metadata {
  indexName:         string;
  open:              number;
  high:              number;
  low:               number;
  previousClose:     number;
  last:              number;
  percChange:        number;
  change:            number;
  timeVal:           string;
  yearHigh:          number;
  yearLow:           number;
  totalTradedVolume: number;
  totalTradedValue:  number;
  ffmc_sum:          number;
}
