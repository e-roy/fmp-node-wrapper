import { senateHouseTools } from '@/providers/vercel-ai/senate-house';

// Mock the FMP client to avoid actual API calls
jest.mock('fmp-node-api', () => ({
  FMP: jest.fn().mockImplementation(() => ({
    senateHouse: {
      getSenateTrading: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'AAPL',
            senator: 'Jerry Moran',
            disclosureDate: '2024-01-15',
            transactionDate: '2024-01-10',
            owner: 'Jerry Moran',
            ticker: 'AAPL',
            assetDescription: 'Apple Inc.',
            type: 'Purchase',
            amount: '$1,001 - $15,000',
            comment: 'Stock purchase',
          },
        ],
      }),
      getHouseTrading: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'MSFT',
            representative: 'Nancy Pelosi',
            disclosureDate: '2024-01-15',
            transactionDate: '2024-01-10',
            owner: 'Nancy Pelosi',
            ticker: 'MSFT',
            assetDescription: 'Microsoft Corporation',
            type: 'Sale',
            amount: '$15,001 - $50,000',
            comment: 'Stock sale',
          },
        ],
      }),
      getSenateTradingByName: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'GOOGL',
            senator: 'John Cornyn',
            disclosureDate: '2024-01-15',
            transactionDate: '2024-01-10',
            owner: 'John Cornyn',
            ticker: 'GOOGL',
            assetDescription: 'Alphabet Inc.',
            type: 'Purchase',
            amount: '$1,001 - $15,000',
            comment: 'Stock purchase',
          },
        ],
      }),
      getHouseTradingByName: jest.fn().mockResolvedValue({
        data: [
          {
            symbol: 'TSLA',
            representative: 'Kevin McCarthy',
            disclosureDate: '2024-01-15',
            transactionDate: '2024-01-10',
            owner: 'Kevin McCarthy',
            ticker: 'TSLA',
            assetDescription: 'Tesla, Inc.',
            type: 'Purchase',
            amount: '$1,001 - $15,000',
            comment: 'Stock purchase',
          },
        ],
      }),
      getSenateTradingRSSFeed: jest.fn().mockResolvedValue({
        data: [
          {
            title: 'Senate Trading Disclosure - Jerry Moran',
            description: 'Purchase of AAPL stock',
            link: 'https://example.com/senate-disclosure-1',
            pubDate: '2024-01-15T10:00:00Z',
            guid: 'senate-1',
          },
          {
            title: 'Senate Trading Disclosure - John Cornyn',
            description: 'Purchase of GOOGL stock',
            link: 'https://example.com/senate-disclosure-2',
            pubDate: '2024-01-15T11:00:00Z',
            guid: 'senate-2',
          },
        ],
      }),
      getHouseTradingRSSFeed: jest.fn().mockResolvedValue({
        data: [
          {
            title: 'House Trading Disclosure - Nancy Pelosi',
            description: 'Sale of MSFT stock',
            link: 'https://example.com/house-disclosure-1',
            pubDate: '2024-01-15T12:00:00Z',
            guid: 'house-1',
          },
          {
            title: 'House Trading Disclosure - Kevin McCarthy',
            description: 'Purchase of TSLA stock',
            link: 'https://example.com/house-disclosure-2',
            pubDate: '2024-01-15T13:00:00Z',
            guid: 'house-2',
          },
        ],
      }),
    },
  })),
}));

describe('Vercel AI Senate House Tools', () => {
  describe('getSenateTrading', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getSenateTrading).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getSenateTrading;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getSenateTrading.description).toBe(
        'Get senate trading data for a specific stock symbol',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getSenateTrading;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getSenateTrading tool', async () => {
      const tool = senateHouseTools.getSenateTrading;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'AAPL' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'AAPL');
      expect(parsedResult[0]).toHaveProperty('senator', 'Jerry Moran');
      expect(parsedResult[0]).toHaveProperty('type', 'Purchase');
      expect(parsedResult[0]).toHaveProperty('amount', '$1,001 - $15,000');
    });
  });

  describe('getHouseTrading', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getHouseTrading).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getHouseTrading;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getHouseTrading.description).toBe(
        'Get house trading data for a specific stock symbol',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getHouseTrading;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getHouseTrading tool', async () => {
      const tool = senateHouseTools.getHouseTrading;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { symbol: 'MSFT' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'MSFT');
      expect(parsedResult[0]).toHaveProperty('representative', 'Nancy Pelosi');
      expect(parsedResult[0]).toHaveProperty('type', 'Sale');
      expect(parsedResult[0]).toHaveProperty('amount', '$15,001 - $50,000');
    });
  });

  describe('getSenateTradingByName', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getSenateTradingByName).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getSenateTradingByName;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getSenateTradingByName.description).toBe(
        'Get senate trading data for a specific senator by name',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getSenateTradingByName;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getSenateTradingByName tool', async () => {
      const tool = senateHouseTools.getSenateTradingByName;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { name: 'John' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'GOOGL');
      expect(parsedResult[0]).toHaveProperty('senator', 'John Cornyn');
      expect(parsedResult[0]).toHaveProperty('type', 'Purchase');
    });
  });

  describe('getHouseTradingByName', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getHouseTradingByName).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getHouseTradingByName;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getHouseTradingByName.description).toBe(
        'Get house trading data for a specific representative by name',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getHouseTradingByName;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getHouseTradingByName tool', async () => {
      const tool = senateHouseTools.getHouseTradingByName;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)(
        { name: 'Kevin' },
        { toolCallId: 'test', messages: [] },
      );
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('symbol', 'TSLA');
      expect(parsedResult[0]).toHaveProperty('representative', 'Kevin McCarthy');
      expect(parsedResult[0]).toHaveProperty('type', 'Purchase');
    });
  });

  describe('getSenateTradingRSSFeed', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getSenateTradingRSSFeed).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getSenateTradingRSSFeed;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getSenateTradingRSSFeed.description).toBe(
        'Get senate trading data through RSS feed with pagination',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getSenateTradingRSSFeed;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getSenateTradingRSSFeed tool with default page', async () => {
      const tool = senateHouseTools.getSenateTradingRSSFeed;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('title', 'Senate Trading Disclosure - Jerry Moran');
      expect(parsedResult[0]).toHaveProperty('description', 'Purchase of AAPL stock');
      expect(parsedResult[0]).toHaveProperty('link', 'https://example.com/senate-disclosure-1');
    });

    it('should execute getSenateTradingRSSFeed tool with custom page', async () => {
      const tool = senateHouseTools.getSenateTradingRSSFeed;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({ page: 1 }, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getHouseTradingRSSFeed', () => {
    it('should be defined', () => {
      expect(senateHouseTools.getHouseTradingRSSFeed).toBeDefined();
    });

    it('should have correct structure', () => {
      const tool = senateHouseTools.getHouseTradingRSSFeed;
      expect(tool).toHaveProperty('description');
      expect(tool).toHaveProperty('inputSchema');
      expect(tool).toHaveProperty('execute');
      expect(typeof tool.execute).toBe('function');
    });

    it('should have correct description', () => {
      expect(senateHouseTools.getHouseTradingRSSFeed.description).toBe(
        'Get house trading data through RSS feed with pagination',
      );
    });

    it('should have correct input schema', () => {
      const tool = senateHouseTools.getHouseTradingRSSFeed;
      expect(tool.inputSchema).toBeDefined();
      expect(typeof tool.inputSchema).toBe('object');
    });

    it('should execute getHouseTradingRSSFeed tool with default page', async () => {
      const tool = senateHouseTools.getHouseTradingRSSFeed;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({}, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult[0]).toHaveProperty('title', 'House Trading Disclosure - Nancy Pelosi');
      expect(parsedResult[0]).toHaveProperty('description', 'Sale of MSFT stock');
      expect(parsedResult[0]).toHaveProperty('link', 'https://example.com/house-disclosure-1');
    });

    it('should execute getHouseTradingRSSFeed tool with custom page', async () => {
      const tool = senateHouseTools.getHouseTradingRSSFeed;
      expect(tool).toBeDefined();
      expect(tool.execute).toBeDefined();

      const result = await (tool.execute as any)({ page: 1 }, { toolCallId: 'test', messages: [] });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
