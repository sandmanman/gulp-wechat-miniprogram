/*
      * @desc Find purchase order by ID
For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** ID of pet that needs to be fetched */
  orderId: number;
}

// [object Object]

export const request = async (params: any): Promise<defs.Order> =>
  await fetch('/store/order/{orderId}', params, 'GET');
