import { CodeGenerator, Interface } from 'pont-engine'

export default class Generator extends CodeGenerator {
  getInterfaceContent(inter: Interface): string {
    return `
    /*
      * @desc ${inter.description}
    */
    import * as defs from '../../baseClass'
    import fetch from '../../../api/wxRequest'

    ${inter.getParamsCode()}

    // ${inter.toJSON()}

    export const request = async(params: any): Promise<${inter.responseType}> => await fetch('${inter.path}', params, '${inter.method.toUpperCase()}')

    `
  }
}
