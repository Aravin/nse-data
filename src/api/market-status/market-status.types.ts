export interface MarketState {
  marketState: MarketStateElement[];
}

export interface MarketStateElement {
  market: string;
  marketStatus: string;
  tradeDate: string;
  index: string;
  last: number | string;
  variation: number | string;
  percentChange: number | string;
  marketStatusMessage: string;
  expiryDate?: string;
  underlying?: string;
  tradeDateFormatted?: string;
}
