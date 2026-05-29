import { TechnicalEndpoints } from '../../endpoints/technical';
import { FMPClient } from '../../client';

jest.mock('../../client');

describe('TechnicalEndpoints', () => {
  let technical: TechnicalEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    technical = new TechnicalEndpoints(mockClient);
  });

  it('getTechnicalIndicator puts the type in the path and passes params (stable)', async () => {
    const res = { success: true, data: [], error: null, status: 200 };
    mockClient.get.mockResolvedValue(res);

    await technical.getTechnicalIndicator({
      symbol: 'AAPL',
      type: 'rsi',
      periodLength: 14,
      timeframe: '1day',
    });

    expect(mockClient.get).toHaveBeenCalledWith('/technical-indicators/rsi', 'stable', {
      symbol: 'AAPL',
      periodLength: 14,
      timeframe: '1day',
    });
  });
});
