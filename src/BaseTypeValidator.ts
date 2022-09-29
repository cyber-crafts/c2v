import { get, has } from "json-pointer"
import { IValidate, IRule, ITypeValidator, IValidationResult } from "./contracts"
import cloneDeep = require("lodash.clonedeep")
import isEqual = require("lodash.isequal")

import Context from "./Context"

export abstract class BaseTypeValidator implements ITypeValidator {
  public validationRules: { [ key: string ]: IValidate } = {}

  public abstract get type (): string

  /**
   * adds a new rule to the validators set
   * @param func {IValidate} the rule name
   * @param name the name of validation rule
   * @deprecated will be removed in favor of addRule()
   * */
  attach (func: IValidate, name?: string) {
    name = name ? name : func.name
    this.addRule({ name, func })
    return this
  }

  clone () {
    return cloneDeep(this)
  }

  /**
   * adds a new validator to the validators set
   * */
  public addRule (rule: IRule): this {
    this.validationRules[ rule.name ] = rule.func
    return this
  }

  /**
   * removes a validationRule with specified name
   * @param name the name of validation rule
   * */
  public removeRule (name: string) {
    delete this.validationRules[ name ]
  }

  /**
   * checks if a validationRule exists
   * @param name the name of validation rule
   * */
  public hasRule (name: string) {
    return name in this.validationRules
  }

  in (...items: Array<unknown>) {
    this.addRule({
      name: "in",
      func: async (value: unknown, obj: unknown, path: string, context: Context): Promise<void> => {
        if (!items.find((item) => isEqual(value, item))) {
          context.addError(this.type + ".in", path, { items })
        }
      },
    })
    return this
  }

  /**
   * checks if the value under check exists _`on`_ another array field (same as _`in`_ but with path reference to the array)
   * @example
   * // this means that the value of key `abc` can be found `on` path `/xyz`
   * schema.keys({
   *   "abc": c2v.str.on("/xyz")
   * })
   */
  on (path: string) {
    this.addRule({
      name: "on",
      func: async (value: unknown, obj: unknown, dataPath: string, context: Context): Promise<void> => {
        if (has(obj, path)) {
          const container: unknown[] = get(obj, path)
          if (!Array.isArray(container) || !container.find(conValue => isEqual(value, conValue))) {
            context.addError(this.type + ".on", dataPath, { path })
          }
        } else {
          context.addError(this.type + ".on", dataPath, { path })
        }
      },
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
  validate (obj: unknown, context: Context, path = ""): Promise<void>[] {
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
