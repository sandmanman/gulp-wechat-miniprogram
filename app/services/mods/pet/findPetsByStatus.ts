/*
      * @desc Finds Pets by status
Multiple status values can be provided with comma separated strings
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** Status values that need to be considered for filter */
  status: Array<string>;
}

// [object Object]

export const request = async (params: any): Promise<Array<defs.Pet>> =>
  await fetch('/pet/findByStatus', params, 'GET');
