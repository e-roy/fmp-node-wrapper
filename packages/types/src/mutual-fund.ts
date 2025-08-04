// Mutual fund types for FMP API

export interface MutualFundHolding {
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
  weightPercent: number;
}
