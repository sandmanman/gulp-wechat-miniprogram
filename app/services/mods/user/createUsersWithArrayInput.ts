/*
 * @desc Creates list of users with given input array
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/user/createWithArray', params, 'POST');
