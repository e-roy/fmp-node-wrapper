import { z } from 'zod';
import { createOpenAITool } from '@/utils/openai-tool-wrapper';
import { getFMPClient } from '@/client';

// Common input schema for calendar date range
const calendarInputSchema = z.object({
  from: z.string().optional().nullable().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().nullable().describe('End date in YYYY-MM-DD format (optional)'),
});

export const getEarningsCalendar = createOpenAITool({
  name: 'getEarningsCalendar',
  description: 'Get earnings calendar showing upcoming and recent earnings announcements',
  inputSchema: calendarInputSchema,
  execute: async ({ from, to }) => {
    const fmp = getFMPClient();
    const earningsCalendar = await fmp.calendar.getEarningsCalendar({
      from: from ?? undefined,
      to: to ?? undefined,
    });
    return JSON.stringify(earningsCalendar.data, null, 2);
  },
});

export const getEconomicCalendar = createOpenAITool({
  name: 'getEconomicCalendar',
  description: 'Get economic calendar showing upcoming and recent economic events and indicators',
  inputSchema: calendarInputSchema,
  execute: async ({ from, to }) => {
    const fmp = getFMPClient();
    const economicCalendar = await fmp.calendar.getEconomicsCalendar({
      from: from ?? undefined,
      to: to ?? undefined,
    });
    return JSON.stringify(economicCalendar.data, null, 2);
  },
});
