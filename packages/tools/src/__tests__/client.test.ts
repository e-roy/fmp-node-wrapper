jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({ __mockFmp: true })),
}));

import { getFMPClient } from '@/client';

describe('client.getFMPClient', () => {
  it('should create an FMP client instance', () => {
    const client = getFMPClient();
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
  });
});
