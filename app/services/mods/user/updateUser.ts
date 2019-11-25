/*
      * @desc Updated user
This can only be done by the logged in user.
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** name that need to be updated */
  username: string;
}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/user/{username}', params, 'PUT');
