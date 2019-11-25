/*
 * @desc Place an order for a pet
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<defs.Order> =>
  await fetch('/store/order', params, 'POST');
