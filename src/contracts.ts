import Context from './Context'

/**
 * the function that validates targeted value
 * @param value {any} the value under validation
 * @param obj {any} the root object under validation
 * @param path {string} the path to the value on the parent object
 * @param context {Context} state of validation to attach messages and errors
 * @return {Promise}
 * return type was left
 * */
export default interface IValidationRule {
  (value: any, obj: any, path: string, context: Context): Promise<void>
}

export interface IValidationError {
  rule: string,     // the rule name that returned the error
  dataPath: string, // the path (a json pointer) to the part of the data that was validated.
  params: object,   // the object with the additional information about error that can be used to create custom error messages
}

export interface IValidationMessage {
  code: string
  params: object
}

export interface IValidationResult {
  success: boolean
  messages: IValidationMessage[]
  errors: IValidationError[]
}

export enum DF {
  ISO8601 = 'YYYY-MM-DD',
  Unix = 'unix',
  Milliseconds = 'milliseconds',
}

export interface ITypeValidator {
  type: string

  validate (value: any, context: Context, path?: string): Promise<void>[]
}

export interface IValidatorWrapper {
  validator: ITypeValidator
  path: string
}
