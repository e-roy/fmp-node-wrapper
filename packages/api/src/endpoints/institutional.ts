// Institutional trading endpoints for FMP API

import { FMPClient } from '@/client';
import { APIResponse } from '@/types/common';
import {
  Form13FParams,
  Form13FDatesParams,
  InstitutionalHolderParams,
  Form13FResponse,
  InstitutionalHolderResponse,
} from '@/types/institutional';

export class InstitutionalEndpoints {
  constructor(private client: FMPClient) {}

  /**
   * Get Form 13F institutional stock ownership data
   * https://site.financialmodelingprep.com/developer/docs#form-13f-13f---institutional-stock-ownership
   * @param symbol - The stock symbol to get the Form 13F data for
   * @param date - The date to get the Form 13F data for (optional)
   * @returns Form 13F institutional stock ownership data
   */
  async getForm13F(params: Form13FParams): Promise<APIResponse<Form13FResponse[]>> {
    const { cik, date } = params;
    const queryParams: Record<string, any> = {};

    if (date) queryParams.date = date;

    return this.client.get(`/form-thirteen/${cik}`, 'v3', queryParams);
  }

  /**
   * Get Form 13F dates for institutional stock ownership
   * https://site.financialmodelingprep.com/developer/docs#form-13f-dates-13f---institutional-stock-ownership
   * @param symbol - The stock symbol to get the Form 13F dates for
   * @returns Form 13F dates for institutional stock ownership
   */
  async getForm13FDates(params: Form13FDatesParams): Promise<APIResponse<string[]>> {
    const { cik } = params;
    return this.client.get(`/form-thirteen-date/${cik}`, 'v3');
  }

  /**
   * Get institutional holders data
   * https://site.financialmodelingprep.com/developer/docs#institutional-holder-13f---institutional-stock-ownership
   * @param symbol - The stock symbol to get the institutional holders for
   * @returns Institutional holders data
   */
  async getInstitutionalHolders(
    params: InstitutionalHolderParams,
  ): Promise<APIResponse<InstitutionalHolderResponse[]>> {
    const { symbol } = params;

    return this.client.get(`/institutional-holder/${symbol}`, 'v3');
  }
}
