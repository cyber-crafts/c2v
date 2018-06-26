import { ValidatorBase } from "../../ValidatorBase"
import AllItemsValidator from "./AllItemsValidator"
import { ContainingType, IValidationResult, IValidator } from "../../intefaces"
import { has } from "json-pointer"
import { combineValidationResults } from "../../utils"
import SingleItemValidator from "./SingleItemValidator"

export default class ArrayValidator extends ValidatorBase {
  private readonly allItemsValidator: AllItemsValidator
  private readonly singleItemValidators: SingleItemValidator[] = []

  constructor (path: string = "", parent: ContainingType = null) {
    super(parent)
    this.allItemsValidator = new AllItemsValidator(this)
  }

  minItems (limit: number) {
    this.addValidator('minItems', (value: any[], obj: any): boolean => {
      return value.length >= limit
    }, {limit})
    return this
  }

  maxItems (limit: number) {
    this.addValidator('maxItems', (value: any[], obj: any): boolean => {
      return value.length <= limit
    }, {limit})
    return this
  }

  allItems (validator: IValidator = null): AllItemsValidator {
    if (validator) this.allItemsValidator.setTypeValidator(validator)
    return this.allItemsValidator
  }

  nth (index: number): SingleItemValidator {
    const siv = new SingleItemValidator(index, this)
    this.singleItemValidators.push(siv)
    return siv
  }

  items (validators: { [key: string]: IValidator }) {
    Object.keys(validators).forEach(key => {
      if (!isNaN(Number(key))) {
        const siv = new SingleItemValidator(Number(key), this)
        this.singleItemValidators.push(siv)
        siv.setValidator(validators[key])
      } else if (key === "*") {
        this.allItemsValidator.setTypeValidator(validators[key])
      }
    })
    return this
  }

  get type (): string {
    return "array"
  }

  validate (value: any, path: string = ""): IValidationResult {
    const selfResult = super.validate(value, path)

    let allItemsResult: IValidationResult = {success: true, messages: [], errors: []}
    if (has(value, path)) {
      // validating each entry
      allItemsResult = combineValidationResults(this.allItemsValidator.validate(value, path), allItemsResult)
    }

    let result: IValidationResult = combineValidationResults(selfResult, allItemsResult)
    this.singleItemValidators.forEach(validator => {
      result = combineValidationResults(result, validator.validate(value, path))
    })

    return result
  }


}
