import { get, has } from "json-pointer"
import { ContainingType, IValidationResult, IValidator } from "../../intefaces"
import StringValidator from "../StringValidator"
import NumberValidator from "../NumberValidator"
import { combineValidationResults } from "../../utils"

export default class AllItemsValidator {
  private readonly parent: ContainingType
  private typeValidator: IValidator

  constructor (parent: ContainingType) {
    this.parent = parent
  }

  get string (): StringValidator {
    const tv = new StringValidator(this.parent)
    this.typeValidator = tv
    return tv
  }

  number (integer: boolean = false): NumberValidator {
    const nv = new NumberValidator(this.parent, integer)
    this.typeValidator = nv
    return nv
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
