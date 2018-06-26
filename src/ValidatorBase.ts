import { get, has, set } from "json-pointer"
import {
  default as IValidationRule,
  ContainingType,
  IValidationResult,
  IValidator,
  IValidationRuleData
} from "./intefaces"
import { isEqual } from "lodash"

export abstract class ValidatorBase implements IValidator {
  protected validators: IValidationRuleData[] = []
  protected readonly parent: ContainingType

  public abstract get type (): string

  public constructor (parent: ContainingType = null) {
    this.parent = parent
  }

  /**
   * adds a new validator to the existing validators array
   * @param validator {IValidationRuleData} the rule name
   * */
  attach (validator: IValidationRuleData) {
    this.addValidator(validator.name, validator.validate, validator.params)
    return this
  }

  /**
   * adds a new validator to the existing validators array
   * @param ruleName {string} the rule name
   * @param validator {IValidationRule} the rule name
   * @param params {object} the params used to customize this validator
   * @param allowsMultiple {boolean} specifies if this rule can be attached multiple times to the same validator
   * */
  protected addValidator (ruleName: string, validator: IValidationRule, params: object, allowsMultiple: boolean = false) {
    if (!allowsMultiple) {
      if (this.validators.findIndex((existingValidator): boolean => existingValidator.name === ruleName) >= 0)
        throw new Error(`validator with the same name ${ruleName} already exists`)
    }
    this.validators.push({
      name: ruleName,
      validate: validator,
      params
    })
  }

  /**
   * validates the target property and run it through all its validators if it exists
   * @param obj {object} the whole object under validation
   * @param path {string = ""} the path to the property under validation
   * @returns IValidationResult
   * */
  validate (obj: object, path: string = ""): IValidationResult {
    const result: IValidationResult = {success: true, messages: [], errors: []}
    // if the object under validation does not exist return default result
    if (!has(obj, path)) return result

    const targetValue = get(obj, path)
    // loops over validators and build the validation result
    this.validators.forEach(validator => {
      const r = validator.validate(targetValue, obj, path)
      if (!r) {
        result.success = false
        result.errors.push({rule: `${this.type}.${validator.name}`, dataPath: path, params: validator.params})
      }
    })
    return result
  }

  in (...items: Array<any>) {
    this.addValidator('in', (value: any, obj: any, path: string): boolean => {
      return !!items.find((item) => isEqual(value, item))
    }, {items})
    return this
  }

  on (path: string) {
    this.addValidator('on', (value: any, obj: any, path: string): boolean => {
      if (!has(obj, path)) return false
      const container: any[] = get(obj, path)
      if (Array.isArray(container))
        return !!container.find((conValue, index) => isEqual(value, conValue))
      return false
    }, {path})
    return this
  }

  // returns parent object
  get _ (): ContainingType {
    return this.parent
  }
}
