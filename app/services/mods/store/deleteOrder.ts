/*
      * @desc Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** ID of the order that needs to be deleted */
  orderId: number;
}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/store/order/{orderId}', params, 'DELETE');
