/*
 * @desc uploads an image
 */
import * as defs from '../../baseClass';
import fetch from '../../../api/wxRequest';

class Params {
  /** ID of pet to update */
  petId: number;
  /** Additional data to pass to server */
  additionalMetadata?: string;
  /** file to upload */
  file?: File;
}

// [object Object]

export const request = async (params: any): Promise<defs.ApiResponse> =>
  await fetch('/pet/{petId}/uploadImage', params, 'POST');
