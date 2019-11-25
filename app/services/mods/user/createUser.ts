/*
      * @desc Create user
This can only be done by the logged in user.
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/user', params, 'POST');
