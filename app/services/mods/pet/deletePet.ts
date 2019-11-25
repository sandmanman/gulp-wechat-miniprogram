/*
 * @desc Deletes a pet
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** api_key */
  api_key?: string;
  /** Pet id to delete */
  petId: number;
}

// [object Object]

export const request = async (params: any): Promise<any> =>
  await fetch('/pet/{petId}', params, 'DELETE');
