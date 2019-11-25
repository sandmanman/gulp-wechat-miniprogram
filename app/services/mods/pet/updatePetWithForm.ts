/*
 * @desc Updates a pet in the store with form data
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** ID of pet that needs to be updated */
  petId: number;
  /** Updated name of the pet */
  name?: string;
  /** Updated status of the pet */
  status?: string;
}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/pet/{petId}', params, 'POST');
