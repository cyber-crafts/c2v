import { get, has } from "json-pointer"
import { default as IValidationRule, ContainingType, IValidationResult, ITypeValidator } from "./intefaces"
import { isEqual } from "lodash"
import Context from "./Context"

export abstract class BaseTypeValidator implements ITypeValidator {
  protected validationRules: IValidationRule[] = []
  protected readonly parent: ContainingType

  public abstract get type (): string

  public constructor (parent: ContainingType = null) {
    this.parent = parent
  }

  /**
   * adds a new validator to the existing validators array
   * @param validator {IValidationRule} the rule name
   * */
  attach (validator: IValidationRule) {
    this.addValidator(validator)
    return this
  }

  /**
   * adds a new validator to the existing validators array
   * @param validator {IValidationRule} the rule name
   * */
  protected addValidator (validator: IValidationRule) {
    this.validationRules.push(validator)
  }

  in (...items: Array<any>) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!items.find((item) => isEqual(value, item))) {
        context.addError(this.type + '.in', path, {items})
      }
    })
    return this
  }

  on (path: string) {
    this.addValidator(async (value: any, obj: any, dataPath: string, context: Context): Promise<void> => {
      if (has(obj, path)) {
        const container: any[] = get(obj, path)
        if (!Array.isArray(container) || !container.find(conValue => isEqual(value, conValue))) {
          context.addError(this.type + '.on', dataPath, {path})
        }
      } else {
        context.addError(this.type + '.on', dataPath, {path})
      }
    })
    return this
  }

  /**
   * validates the target property and run it through all its validators if it exists
   * @param obj {object} the whole object under validation
   * @param path {string = ""} the path to the property under validation
   * @param context
   * @returns IValidationResult
   * */
  validate (obj: object, context: Context, path: string = ""): Promise<void>[] {
    const validatorPromises: Promise<void>[] = []
    // if the object under validation does not exist return default result
    if (!has(obj, path)) return validatorPromises

    const targetValue = get(obj, path)
    // loops over validators and build the validation result

    this.validationRules.forEach(validationRule => {
      validatorPromises.push(validationRule(targetValue, obj, path, context))
    })
    return validatorPromises
  }


  // returns parent object
  get _ (): ContainingType {
    return this.parent
  }
}
