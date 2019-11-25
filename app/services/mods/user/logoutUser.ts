/*
 * @desc Logs out current logged in user session
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/user/logout', params, 'GET');
