import { AnalystEndpoints } from '../../endpoints/analyst';
import { FMPClient } from '../../client';

jest.mock('../../client');

describe('AnalystEndpoints', () => {
  let analyst: AnalystEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    analyst = new AnalystEndpoints(mockClient);
  });

  it('getEstimates uses /analyst-estimates (stable) with params', async () => {
    const res = { success: true, data: [], error: null, status: 200 };
    mockClient.get.mockResolvedValue(res);

    await analyst.getEstimates({ symbol: 'AAPL', period: 'annual', limit: 2 });

    expect(mockClient.get).toHaveBeenCalledWith('/analyst-estimates', 'stable', {
      symbol: 'AAPL',
      period: 'annual',
      limit: 2,
    });
  });

  it('getPriceTargetConsensus uses getSingle on /price-target-consensus', async () => {
    const res = { success: true, data: {}, error: null, status: 200 };
    mockClient.getSingle.mockResolvedValue(res);

    await analyst.getPriceTargetConsensus({ symbol: 'AAPL' });

    expect(mockClient.getSingle).toHaveBeenCalledWith('/price-target-consensus', 'stable', {
      symbol: 'AAPL',
    });
  });

  it('getGrades uses /grades (stable)', async () => {
    const res = { success: true, data: [], error: null, status: 200 };
    mockClient.get.mockResolvedValue(res);

    await analyst.getGrades({ symbol: 'AAPL' });

    expect(mockClient.get).toHaveBeenCalledWith('/grades', 'stable', { symbol: 'AAPL' });
  });
});
