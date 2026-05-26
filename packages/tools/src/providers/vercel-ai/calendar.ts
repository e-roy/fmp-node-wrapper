import { z } from 'zod';
import { createTool } from '@/utils/aisdk-tool-wrapper';
import { getFMPClient } from '@/client';
import { toToolResponse } from '@/utils/format-response';

export const calendarTools = {
  getEarningsCalendar: createTool({
    name: 'getEarningsCalendar',
    description: 'Get earnings calendar',
    inputSchema: z.object({
      from: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      to: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
    execute: async ({ from, to }) => {
      const fmp = getFMPClient();
      const earningsCalendar = await fmp.calendar.getEarningsCalendar({ from, to });
      const response = toToolResponse(earningsCalendar);
      return response;
    },
  }),

  getEconomicCalendar: createTool({
    name: 'getEconomicCalendar',
    description: 'Get economic calendar',
    inputSchema: z.object({
      from: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      to: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
    execute: async ({ from, to }) => {
      const fmp = getFMPClient();
      const economicCalendar = await fmp.calendar.getEconomicsCalendar({ from, to });
      const response = toToolResponse(economicCalendar);
      return response;
    },
  }),
};
