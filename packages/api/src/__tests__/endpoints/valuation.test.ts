import { ValuationEndpoints } from '../../endpoints/valuation';
import { FMPClient } from '../../client';

jest.mock('../../client');

describe('ValuationEndpoints', () => {
  let valuation: ValuationEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    valuation = new ValuationEndpoints(mockClient);
  });

  it('getDiscountedCashFlow uses getSingle on /discounted-cash-flow', async () => {
    const res = { success: true, data: {}, error: null, status: 200 };
    mockClient.getSingle.mockResolvedValue(res);

    await valuation.getDiscountedCashFlow({ symbol: 'AAPL' });

    expect(mockClient.getSingle).toHaveBeenCalledWith('/discounted-cash-flow', 'stable', {
      symbol: 'AAPL',
    });
  });

  it('getRatingSnapshot uses getSingle on /ratings-snapshot', async () => {
    const res = { success: true, data: {}, error: null, status: 200 };
    mockClient.getSingle.mockResolvedValue(res);

    await valuation.getRatingSnapshot({ symbol: 'AAPL' });

    expect(mockClient.getSingle).toHaveBeenCalledWith('/ratings-snapshot', 'stable', {
      symbol: 'AAPL',
    });
  });

  it('getHistoricalRating uses /ratings-historical (stable) with limit', async () => {
    const res = { success: true, data: [], error: null, status: 200 };
    mockClient.get.mockResolvedValue(res);

    await valuation.getHistoricalRating({ symbol: 'AAPL', limit: 5 });

    expect(mockClient.get).toHaveBeenCalledWith('/ratings-historical', 'stable', {
      symbol: 'AAPL',
      limit: 5,
    });
  });
});
