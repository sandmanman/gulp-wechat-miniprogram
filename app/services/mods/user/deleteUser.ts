/*
      * @desc Delete user
This can only be done by the logged in user.
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** The name that needs to be deleted */
  username: string;
}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/user/{username}', params, 'DELETE');
