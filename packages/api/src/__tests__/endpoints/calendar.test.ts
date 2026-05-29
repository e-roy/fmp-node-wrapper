import { CalendarEndpoints } from '../../endpoints/calendar';
import { FMPClient } from '../../client';

// Mock the FMPClient
jest.mock('../../client');

describe('CalendarEndpoints', () => {
  let calendarEndpoints: CalendarEndpoints;
  let mockClient: jest.Mocked<FMPClient>;

  beforeEach(() => {
    mockClient = new FMPClient({ apiKey: 'test-key' }) as jest.Mocked<FMPClient>;
    calendarEndpoints = new CalendarEndpoints(mockClient);
  });

  describe('getEarningsCalendar', () => {
    it('should get earnings calendar with date range using /earning_calendar endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEarningsCalendar({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/earning_calendar', 'v3', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get earnings calendar without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEarningsCalendar();

      expect(mockClient.get).toHaveBeenCalledWith('/earning_calendar', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEarningsConfirmed', () => {
    it('should get confirmed earnings using /earning-calendar-confirmed v4 endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEarningsConfirmed({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/earning-calendar-confirmed', 'v4', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get confirmed earnings without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEarningsConfirmed();

      expect(mockClient.get).toHaveBeenCalledWith('/earning-calendar-confirmed', 'v4', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDividendsCalendar', () => {
    it('should get dividends calendar using /stock_dividend_calendar endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'KO', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getDividendsCalendar({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/stock_dividend_calendar', 'v3', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get dividends calendar without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getDividendsCalendar();

      expect(mockClient.get).toHaveBeenCalledWith('/stock_dividend_calendar', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEconomicsCalendar', () => {
    it('should get economics calendar using /economic_calendar endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ event: 'CPI', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEconomicsCalendar({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/economic_calendar', 'v3', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get economics calendar without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getEconomicsCalendar();

      expect(mockClient.get).toHaveBeenCalledWith('/economic_calendar', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getIPOCalendar', () => {
    it('should get IPO calendar using /ipo_calendar endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'NEW', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getIPOCalendar({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/ipo_calendar', 'v3', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get IPO calendar without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getIPOCalendar();

      expect(mockClient.get).toHaveBeenCalledWith('/ipo_calendar', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSplitsCalendar', () => {
    it('should get splits calendar using /stock_split_calendar endpoint', async () => {
      const mockResponse = {
        success: true,
        data: [{ symbol: 'AAPL', date: '2024-01-15' }],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getSplitsCalendar({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/stock_split_calendar', 'v3', {
        from: '2024-01-01',
        to: '2024-01-31',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get splits calendar without params', async () => {
      const mockResponse = {
        success: true,
        data: [],
        error: null,
        status: 200,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await calendarEndpoints.getSplitsCalendar();

      expect(mockClient.get).toHaveBeenCalledWith('/stock_split_calendar', 'v3', {});
      expect(result).toEqual(mockResponse);
    });
  });
});
