/*
      * @desc Finds Pets by tags
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
    */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** Tags to filter by */
  tags: Array<string>;
}

// [object Object]

export const request = async (params: any): Promise<Array<defs.Pet>> =>
  await fetch('/pet/findByTags', params, 'GET');
