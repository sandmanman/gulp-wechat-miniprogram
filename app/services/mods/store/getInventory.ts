/*
      * @desc Returns pet inventories by status
Returns a map of status codes to quantities
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {}

// [object Object]

export const request = async (params: any): Promise<ObjectMap<any, number>> =>
  await fetch('/store/inventory', params, 'GET');
