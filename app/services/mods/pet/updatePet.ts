/*
 * @desc Update an existing pet
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/pet', params, 'PUT');
