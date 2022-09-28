import * as typeValidators from "./typeValidators"
import * as contracts from "./contracts"
export * from "./utils"

export { default as Context } from "./Context"
export { contracts }
export { BaseTypeValidator } from "./BaseTypeValidator"

export const validators = typeValidators

export default class {
  static get str () {
    return new validators.StringValidator()
  }

  static get int () {
    return new validators.NumberValidator(true)
  }

  static get num () {
    return new validators.NumberValidator()
  }

  static get date () {
    return new validators.DateValidator()
  }

  static get bool () {
    return new validators.BooleanValidator()
  }

  static get arr () {
    return new validators.ArrayValidator()
  }

  static get obj () {
    return new validators.ObjectValidator()
  }
}
