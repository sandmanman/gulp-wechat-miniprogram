/*
      * @desc Find pet by ID
Returns a single pet
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** ID of pet to return */
  petId: number;
}

// [object Object]

export const request = async (params: any): Promise<defs.Pet> =>
  await fetch('/pet/{petId}', params, 'GET');
