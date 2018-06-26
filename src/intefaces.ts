import ObjectValidator from "./validators/ObjectValidator"
import ArrayValidator from "./validators/ArrayValidator"

export interface IValidator {
  type: string
  _: ContainingType

  validate (value: any, path: string): IValidationResult
}

export default interface IValidationRule {
  (value: any, obj: any, path: string): boolean
}

export interface IValidationResult {
  success: boolean
  messages: IValidationMessage[]
  errors: IValidationError[]
}

export interface IValidationMessage {
  code: string
  params: object
}

export interface IValidationError {
  rule: string,     // the rule name that returned the error
  dataPath: string, // the path (a json pointer) to the part of the data that was validated.
  params: object,   // the object with the additional information about error that can be used to create custom error messages
}

export enum DF {
  ISO8601 = "YYYY-MM-DD",
  Unix = "unix",
  Milliseconds = "milliseconds",
}

export type ContainingType = ObjectValidator | ArrayValidator

export interface IAttachable {
  addEntryValidator<T extends IValidator> (name: string|number, validator: T): T
}

export interface IValidationRuleData {
  name: string
  validate: IValidationRule
  params: object
}
