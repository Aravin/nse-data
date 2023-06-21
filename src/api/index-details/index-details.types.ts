export interface IndexDetails {
  data:        Datum[];
  timestamp:   string;
  advances:    number;
  declines:    number;
  unchanged:   number;
  dates:       Dates;
  date30dAgo:  string;
  date365dAgo: string;
}

export interface Datum {
  key:            Key;
  index:          string;
  indexSymbol:    string;
  last:           number;
  variation:      number;
  percentChange:  number;
  open:           number;
  high:           number;
  low:            number;
  previousClose:  number;
  yearHigh:       number;
  yearLow:        number;
  pe:             null | string;
  pb:             string;
  dy:             string;
  declines?:      string;
  advances?:      string;
  unchanged?:     string;
  perChange365d:  number;
  date365dAgo:    string;
  chart365dPath:  string;
  date30dAgo:     string;
  perChange30d:   number;
  chart30dPath:   string;
  chartTodayPath: string;
  previousDay:    number;
  oneWeekAgo:     number;
  oneMonthAgo:    number;
  oneYearAgo:     number;
}

export type Key = "BROAD MARKET INDICES" | "SECTORAL INDICES" | "STRATEGY INDICES" | "THEMATIC INDICES" | "FIXED INCOME INDICES";

export interface Dates {
  previousDay: string;
  oneWeekAgo:  string;
  oneMonthAgo: string;
  oneYearAgo:  string;
}
