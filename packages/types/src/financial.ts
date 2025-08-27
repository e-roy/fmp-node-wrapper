// Financial statement types for FMP API

// Base interface for common fields across all financial statements
// export interface FinancialStatementBase {
//   date: string;
//   symbol: string;
//   reportedCurrency: string;
//   cik: string;
//   fillingDate: string;
//   acceptedDate: string;
//   calendarYear: string;
//   period: string;
//   link: string;
//   finalLink: string;
// }

// Base interface for growth statements
// export interface GrowthStatementBase {
//   date: string;
//   symbol: string;
//   calendarYear: string;
//   period: string;
// }

// Income Statement
export interface IncomeStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebit: number;
  nonOperatingIncomeExcludingInterest: number;
  operatingIncome: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncomeFromContinuingOperations: number;
  netIncomeFromDiscontinuedOperations: number;
  otherAdjustmentsToNetIncome: number;
  netIncome: number;
  netIncomeDeductions: number;
  bottomLineNetIncome: number;
  eps: number;
  epsDiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
}

// Balance Sheet
export interface BalanceSheet {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
  cashAndCashEquivalents: number;
  shortTermInvestments: number;
  cashAndShortTermInvestments: number;
  netReceivables: number;
  accountsReceivables: number;
  otherReceivables: number;
  inventory: number;
  prepaids: number;
  otherCurrentAssets: number;
  totalCurrentAssets: number;
  propertyPlantEquipmentNet: number;
  goodwill: number;
  intangibleAssets: number;
  goodwillAndIntangibleAssets: number;
  longTermInvestments: number;
  taxAssets: number;
  otherNonCurrentAssets: number;
  totalNonCurrentAssets: number;
  otherAssets: number;
  totalAssets: number;
  totalPayables: number;
  accountPayables: number;
  otherPayables: number;
  accruedExpenses: number;
  shortTermDebt: number;
  capitalLeaseObligationsCurrent: number;
  taxPayables: number;
  deferredRevenue: number;
  otherCurrentLiabilities: number;
  totalCurrentLiabilities: number;
  longTermDebt: number;
  deferredRevenueNonCurrent: number;
  deferredTaxLiabilitiesNonCurrent: number;
  otherNonCurrentLiabilities: number;
  totalNonCurrentLiabilities: number;
  otherLiabilities: number;
  capitalLeaseObligations: number;
  totalLiabilities: number;
  treasuryStock: number;
  preferredStock: number;
  commonStock: number;
  retainedEarnings: number;
  additionalPaidInCapital: number;
  accumulatedOtherComprehensiveIncomeLoss: number;
  otherTotalStockholdersEquity: number;
  totalStockholdersEquity: number;
  totalEquity: number;
  minorityInterest: number;
  totalLiabilitiesAndTotalEquity: number;
  totalInvestments: number;
  totalDebt: number;
  netDebt: number;
}

// Cash Flow Statement
export interface CashFlowStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
  netIncome: number;
  depreciationAndAmortization: number;
  deferredIncomeTax: number;
  stockBasedCompensation: number;
  changeInWorkingCapital: number;
  accountsReceivables: number;
  inventory: number;
  accountsPayables: number;
  otherWorkingCapital: number;
  otherNonCashItems: number;
  netCashProvidedByOperatingActivities: number;
  investmentsInPropertyPlantAndEquipment: number;
  acquisitionsNet: number;
  purchasesOfInvestments: number;
  salesMaturitiesOfInvestments: number;
  otherInvestingActivities: number;
  netCashProvidedByInvestingActivities: number;
  netDebtIssuance: number;
  longTermNetDebtIssuance: number;
  shortTermNetDebtIssuance: number;
  netStockIssuance: number;
  netCommonStockIssuance: number;
  commonStockIssuance: number;
  commonStockRepurchased: number;
  netPreferredStockIssuance: number;
  netDividendsPaid: number;
  commonDividendsPaid: number;
  preferredDividendsPaid: number;
  otherFinancingActivities: number;
  netCashProvidedByFinancingActivities: number;
  effectOfForexChangesOnCash: number;
  netChangeInCash: number;
  cashAtEndOfPeriod: number;
  cashAtBeginningOfPeriod: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  incomeTaxesPaid: number;
  interestPaid: number;
}

// Key Metrics
export interface KeyMetrics {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  marketCap: number;
  enterpriseValue: number;
  evToSales: number;
  evToOperatingCashFlow: number;
  evToFreeCashFlow: number;
  evToEBITDA: number;
  netDebtToEBITDA: number;
  currentRatio: number;
  incomeQuality: number;
  grahamNumber: number;
  grahamNetNet: number;
  taxBurden: number;
  interestBurden: number;
  workingCapital: number;
  investedCapital: number;
  returnOnAssets: number;
  operatingReturnOnAssets: number;
  returnOnTangibleAssets: number;
  returnOnEquity: number;
  returnOnInvestedCapital: number;
  returnOnCapitalEmployed: number;
  earningsYield: number;
  freeCashFlowYield: number;
  capexToOperatingCashFlow: number;
  capexToDepreciation: number;
  capexToRevenue: number;
  salesGeneralAndAdministrativeToRevenue: number;
  researchAndDevelopementToRevenue: number;
  stockBasedCompensationToRevenue: number;
  intangiblesToTotalAssets: number;
  averageReceivables: number;
  averagePayables: number;
  averageInventory: number;
  daysOfSalesOutstanding: number;
  daysOfPayablesOutstanding: number;
  daysOfInventoryOutstanding: number;
  operatingCycle: number;
  cashConversionCycle: number;
  freeCashFlowToEquity: number;
  freeCashFlowToFirm: number;
  tangibleAssetValue: number;
  netCurrentAssetValue: number;
}

// Financial Ratios
export interface FinancialRatios {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  grossProfitMargin: number;
  ebitMargin: number;
  ebitdaMargin: number;
  operatingProfitMargin: number;
  pretaxProfitMargin: number;
  continuousOperationsProfitMargin: number;
  netProfitMargin: number;
  bottomLineProfitMargin: number;
  receivablesTurnover: number;
  payablesTurnover: number;
  inventoryTurnover: number;
  fixedAssetTurnover: number;
  assetTurnover: number;
  currentRatio: number;
  quickRatio: number;
  solvencyRatio: number;
  cashRatio: number;
  priceToEarningsRatio: number;
  priceToEarningsGrowthRatio: number;
  forwardPriceToEarningsGrowthRatio: number;
  priceToBookRatio: number;
  priceToSalesRatio: number;
  priceToFreeCashFlowRatio: number;
  priceToOperatingCashFlowRatio: number;
  debtToAssetsRatio: number;
  debtToEquityRatio: number;
  debtToCapitalRatio: number;
  longTermDebtToCapitalRatio: number;
  financialLeverageRatio: number;
  workingCapitalTurnoverRatio: number;
  operatingCashFlowRatio: number;
  operatingCashFlowSalesRatio: number;
  freeCashFlowOperatingCashFlowRatio: number;
  debtServiceCoverageRatio: number;
  interestCoverageRatio: number;
  shortTermOperatingCashFlowCoverageRatio: number;
  operatingCashFlowCoverageRatio: number;
  capitalExpenditureCoverageRatio: number;
  dividendPaidAndCapexCoverageRatio: number;
  dividendPayoutRatio: number;
  dividendYield: number;
  dividendYieldPercentage: number;
  revenuePerShare: number;
  netIncomePerShare: number;
  interestDebtPerShare: number;
  cashPerShare: number;
  bookValuePerShare: number;
  tangibleBookValuePerShare: number;
  shareholdersEquityPerShare: number;
  operatingCashFlowPerShare: number;
  capexPerShare: number;
  freeCashFlowPerShare: number;
  netIncomePerEBT: number;
  ebtPerEbit: number;
  priceToFairValue: number;
  debtToMarketCap: number;
  effectiveTaxRate: number;
  enterpriseValueMultiple: number;
}

// Enterprise Value
export interface EnterpriseValue {
  symbol: string;
  date: string;
  stockPrice: number;
  numberOfShares: number;
  marketCapitalization: number;
  minusCashAndCashEquivalents: number;
  addTotalDebt: number;
  enterpriseValue: number;
}

// Cashflow Growth
export interface CashflowGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthNetIncome: number;
  growthDepreciationAndAmortization: number;
  growthDeferredIncomeTax: number;
  growthStockBasedCompensation: number;
  growthChangeInWorkingCapital: number;
  growthAccountsReceivables: number;
  growthInventory: number;
  growthAccountsPayables: number;
  growthOtherWorkingCapital: number;
  growthOtherNonCashItems: number;
  growthNetCashProvidedByOperatingActivites: number;
  growthInvestmentsInPropertyPlantAndEquipment: number;
  growthAcquisitionsNet: number;
  growthPurchasesOfInvestments: number;
  growthSalesMaturitiesOfInvestments: number;
  growthOtherInvestingActivites: number;
  growthNetCashUsedForInvestingActivites: number;
  growthDebtRepayment: number;
  growthCommonStockIssued: number;
  growthCommonStockRepurchased: number;
  growthDividendsPaid: number;
  growthOtherFinancingActivites: number;
  growthNetCashUsedProvidedByFinancingActivities: number;
  growthEffectOfForexChangesOnCash: number;
  growthNetChangeInCash: number;
  growthCashAtEndOfPeriod: number;
  growthCashAtBeginningOfPeriod: number;
  growthOperatingCashFlow: number;
  growthCapitalExpenditure: number;
  growthFreeCashFlow: number;
  growthNetDebtIssuance: number;
  growthLongTermNetDebtIssuance: number;
  growthShortTermNetDebtIssuance: number;
  growthNetStockIssuance: number;
  growthPreferredDividendsPaid: number;
  growthIncomeTaxesPaid: number;
  growthInterestPaid: number;
}

// Income Growth
export interface IncomeGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthRevenue: number;
  growthCostOfRevenue: number;
  growthGrossProfit: number;
  growthGrossProfitRatio: number;
  growthResearchAndDevelopmentExpenses: number;
  growthGeneralAndAdministrativeExpenses: number;
  growthSellingAndMarketingExpenses: number;
  growthOtherExpenses: number;
  growthOperatingExpenses: number;
  growthCostAndExpenses: number;
  growthInterestIncome: number;
  growthInterestExpense: number;
  growthDepreciationAndAmortization: number;
  growthEBITDA: number;
  growthOperatingIncome: number;
  growthIncomeBeforeTax: number;
  growthIncomeTaxExpense: number;
  growthNetIncome: number;
  growthEPS: number;
  growthEPSDiluted: number;
  growthWeightedAverageShsOut: number;
  growthWeightedAverageShsOutDil: number;
  growthEBIT: number;
  growthNonOperatingIncomeExcludingInterest: number;
  growthNetInterestIncome: number;
  growthTotalOtherIncomeExpensesNet: number;
  growthNetIncomeFromContinuingOperations: number;
  growthOtherAdjustmentsToNetIncome: number;
  growthNetIncomeDeductions: number;
}

// Balance Sheet Growth
export interface BalanceSheetGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthCashAndCashEquivalents: number;
  growthShortTermInvestments: number;
  growthCashAndShortTermInvestments: number;
  growthNetReceivables: number;
  growthInventory: number;
  growthOtherCurrentAssets: number;
  growthTotalCurrentAssets: number;
  growthPropertyPlantEquipmentNet: number;
  growthGoodwill: number;
  growthIntangibleAssets: number;
  growthGoodwillAndIntangibleAssets: number;
  growthLongTermInvestments: number;
  growthTaxAssets: number;
  growthOtherNonCurrentAssets: number;
  growthTotalNonCurrentAssets: number;
  growthOtherAssets: number;
  growthTotalAssets: number;
  growthAccountPayables: number;
  growthShortTermDebt: number;
  growthTaxPayables: number;
  growthDeferredRevenue: number;
  growthOtherCurrentLiabilities: number;
  growthTotalCurrentLiabilities: number;
  growthLongTermDebt: number;
  growthDeferredRevenueNonCurrent: number;
  growthDeferredTaxLiabilitiesNonCurrent: number;
  growthOtherNonCurrentLiabilities: number;
  growthTotalNonCurrentLiabilities: number;
  growthOtherLiabilities: number;
  growthTotalLiabilities: number;
  growthPreferredStock: number;
  growthCommonStock: number;
  growthRetainedEarnings: number;
  growthAccumulatedOtherComprehensiveIncomeLoss: number;
  growthOthertotalStockholdersEquity: number;
  growthTotalStockholdersEquity: number;
  growthMinorityInterest: number;
  growthTotalEquity: number;
  growthTotalLiabilitiesAndStockholdersEquity: number;
  growthTotalInvestments: number;
  growthTotalDebt: number;
  growthNetDebt: number;
  growthAccountsReceivables: number;
  growthOtherReceivables: number;
  growthPrepaids: number;
  growthTotalPayables: number;
  growthOtherPayables: number;
  growthAccruedExpenses: number;
  growthCapitalLeaseObligationsCurrent: number;
  growthAdditionalPaidInCapital: number;
  growthTreasuryStock: number;
}

// Financial Growth
export interface FinancialGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  revenueGrowth: number;
  grossProfitGrowth: number;
  ebitgrowth: number;
  operatingIncomeGrowth: number;
  netIncomeGrowth: number;
  epsgrowth: number;
  epsdilutedGrowth: number;
  weightedAverageSharesGrowth: number;
  weightedAverageSharesDilutedGrowth: number;
  dividendsPerShareGrowth: number;
  operatingCashFlowGrowth: number;
  receivablesGrowth: number;
  inventoryGrowth: number;
  assetGrowth: number;
  bookValueperShareGrowth: number;
  debtGrowth: number;
  rdexpenseGrowth: number;
  sgaexpensesGrowth: number;
  freeCashFlowGrowth: number;
  tenYRevenueGrowthPerShare: number;
  fiveYRevenueGrowthPerShare: number;
  threeYRevenueGrowthPerShare: number;
  tenYOperatingCFGrowthPerShare: number;
  fiveYOperatingCFGrowthPerShare: number;
  threeYOperatingCFGrowthPerShare: number;
  tenYNetIncomeGrowthPerShare: number;
  fiveYNetIncomeGrowthPerShare: number;
  threeYNetIncomeGrowthPerShare: number;
  tenYShareholdersEquityGrowthPerShare: number;
  fiveYShareholdersEquityGrowthPerShare: number;
  threeYShareholdersEquityGrowthPerShare: number;
  tenYDividendperShareGrowthPerShare: number;
  fiveYDividendperShareGrowthPerShare: number;
  threeYDividendperShareGrowthPerShare: number;
  ebitdaGrowth: number;
  growthCapitalExpenditure: number;
  tenYBottomLineNetIncomeGrowthPerShare: number;
  fiveYBottomLineNetIncomeGrowthPerShare: number;
  threeYBottomLineNetIncomeGrowthPerShare: number;
}

// Earnings Historical
export interface EarningsHistorical {
  date: string;
  symbol: string;
  epsActual: number;
  epsEstimated: number;
  revenueActual: number;
  revenueEstimated: number;
  lastUpdated: string;
}

// Earnings Surprises
export interface EarningsSurprises {
  date: string;
  symbol: string;
  actualEarningResult: number;
  estimatedEarning: number;
}
