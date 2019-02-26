import { get, has } from 'json-pointer'
import { default as IValidationRule, ITypeValidator, IValidationResult } from './contracts'
import { cloneDeep, isEqual } from 'lodash'
import Context from './Context'

// todo: how to access nested fields/objects
export abstract class BaseTypeValidator implements ITypeValidator {
  public validationRules: { [ key: string ]: IValidationRule } = {}

  public abstract get type (): string

  /**
   * adds a new validator to the validators set
   * @param validator {IValidationRule} the rule name
   * @param name the name of validation rule
   * */
  attach (validator: IValidationRule, name?: string) {
    name = name ? name : validator.name
    this.addValidator(name, validator)
    return this
  }

  /**
   * adds a new validator to the validators set
   * @param name the name of validation rule
   * @param validator {IValidationRule} the rule name
   * */
  protected addValidator (name: string, validator: IValidationRule) {
    this.validationRules[ name ] = validator
  }

  in (...items: Array<any>) {
    this.addValidator('in', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!items.find((item) => isEqual(value, item))) {
        context.addError(this.type + '.in', path, { items })
      }
    })
    return this
  }

  on (path: string) {
    this.addValidator('on', async (value: any, obj: any, dataPath: string, context: Context): Promise<void> => {
      if (has(obj, path)) {
        const container: any[] = get(obj, path)
        if (!Array.isArray(container) || !container.find(conValue => isEqual(value, conValue))) {
          context.addError(this.type + '.on', dataPath, { path })
        }
      } else {
        context.addError(this.type + '.on', dataPath, { path })
      }
    })
    return this
  }

  /**
   * validates the target property and run it through all its validators if it exists
   * @param obj {object} the whole object under validation
   * @param path {string = ""} the path to the property under validation
   * @param context
   * @param data a parameter that provides additional data to be used for validation
   * @returns IValidationResult
   * */
  validate (obj: object, context: Context, path: string = ''): Promise<void>[] {
    obj = cloneDeep(obj)

    const validatorPromises: Promise<void>[] = []
    // if the object under validation does not exist return default result
    if (!has(obj, path)) return validatorPromises

    const targetValue = get(obj, path)

    // loops over validators and build the validation result
    Object.values(this.validationRules).forEach(validationRule => {
      validatorPromises.push(validationRule(targetValue, obj, path, context))
    })
    return validatorPromises
  }
}
