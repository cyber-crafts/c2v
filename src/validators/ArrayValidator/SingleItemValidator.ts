import { has } from "json-pointer"
import { ContainingType, IValidationResult, IValidator } from "../../intefaces"
import StringValidator from "../StringValidator"
import NumberValidator from "../NumberValidator"
import { combineValidationResults } from "../../utils"

export default class SingleItemValidator {
  private readonly parent: ContainingType
  private readonly index: number
  public typeValidator: IValidator

  constructor (index: number, parent: ContainingType) {
    this.index = index
    this.parent = parent
  }

  setValidator (validator: IValidator) {
    this.typeValidator = validator
  }

  string (): StringValidator {
    const tv = new StringValidator(this.parent)
    this.typeValidator = tv
    return tv
  }

  number (integer: boolean = false): NumberValidator {
    const nv = new NumberValidator(integer, this.parent)
    this.typeValidator = nv
    return nv
  }

  validate (value: any, path: string): IValidationResult {
    let result: IValidationResult = {success: true, messages: [], errors: []}
    const dataPath = `${path}/${this.index}`
    if (!has(value, path) || !has(value, dataPath)) return result
    const itemResult = this.typeValidator.validate(value, dataPath)
    result = combineValidationResults(result, itemResult)
    return result
  }
}
