import { get, has } from "json-pointer"
import { ContainingType, DF, IValidationResult, IValidator } from "../../intefaces"
import StringValidator from "../StringValidator"
import NumberValidator from "../NumberValidator"
import { combineValidationResults } from "../../utils"
import BooleanValidator from "../BooleanValidator"
import { DateValidator } from "../index"

export default class AllItemsValidator {
  private readonly parent: ContainingType
  private typeValidator: IValidator

  constructor (parent: ContainingType) {
    this.parent = parent
  }

  setTypeValidator<T extends IValidator> (validator: T): T {
    this.typeValidator = validator
    return validator
  }

  string (): StringValidator {
    return this.setTypeValidator(new StringValidator(this.parent))
  }

  number (integer: boolean = false): NumberValidator {
    return this.setTypeValidator(new NumberValidator(integer, this.parent))
  }

  boolean (): BooleanValidator {
    return this.setTypeValidator(new BooleanValidator(this.parent))
  }

  date (format: DF = DF.ISO8601): DateValidator {
    return this.setTypeValidator(new DateValidator(format, this.parent))
  }

  validate (value: any, path: string): IValidationResult {
    let result: IValidationResult = {success: true, messages: [], errors: []}
    if (!has(value, path)) return result
    const array: Array<any> = get(value, path)

    if (this.typeValidator) {
      array.forEach((item, index) => {
        const itemResult = this.typeValidator.validate(value, `${path}/${index}`)
        result = combineValidationResults(result, itemResult)
      })
    }
    return result
  }
}
