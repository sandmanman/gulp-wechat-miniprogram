/*
 * @desc Get user by user name
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username: string;
}

// [object Object]

export const request = async (params: any): Promise<defs.User> =>
  await fetch('/user/{username}', params, 'GET');
