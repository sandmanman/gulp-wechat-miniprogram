/*
 * @desc Logs user into the system
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** The user name for login */
  username: string;
  /** The password for login in clear text */
  password: string;
}

// [object Object]

export const request = async (params: any): Promise<string> =>
  await fetch('/user/login', params, 'GET');
