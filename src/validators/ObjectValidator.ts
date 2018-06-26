import { ValidatorBase } from "../ValidatorBase"
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./"
import { ContainingType, DF, IAttachable, IValidationResult, IValidator } from "../intefaces"
import { get, has, set } from "json-pointer"
import { combineValidationResults } from "../utils"

const getPath = (name: string): string => (name.charAt(0) === "/") ? name : "/" + name

export default class ObjectValidator extends ValidatorBase implements IAttachable {
  protected readonly path: string
  private requiredProps: string[] = []
  private typeValidators: { [path: string]: IValidator } = {}

  constructor (path: string = "", parent: ContainingType = null) {
    super(parent)
    this.path = path
    this.addValidator('object', (value): boolean => typeof value === "object", {})
  }

  get type (): string {
    return "object"
  }

  requires (...properties: string[]) {
    this.requiredProps = properties
    return this
  }

  requiresWithAny (conditionalProps: string[] | string, assertionPaths: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps]
    const assertionProperties: string[] = (Array.isArray(assertionPaths)) ? assertionPaths : [assertionPaths]
    conditionalProperties.forEach(conditionalProp => {
      this.addValidator('requiresWithAny', (value: any, obj: any): boolean => {
        for (let i = 0; i < assertionProperties.length; i++)
          if (has(obj, assertionProperties[i]))
            return value.hasOwnProperty(conditionalProp)

        return true
      }, {conditionalProperty: conditionalProp, assertionProperties}, true)
    })
    return this
  }

  requiresWithAll (conditionalProps: string[] | string, assertionProps: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps]
    const assertionProperties: string[] = (Array.isArray(assertionProps)) ? assertionProps : [assertionProps]

    conditionalProperties.forEach(conditionalProp => {
      this.addValidator('requiresWithAll', (value: any, obj: any): boolean => {
        for (let i = 0; i < assertionProperties.length; i++)
          if (!has(obj, assertionProperties[i]))
            return true

        return value.hasOwnProperty(conditionalProp)
      }, {conditionalProperty: conditionalProp, assertionProperties})
    })

    return this
  }

  addEntryValidator<T extends IValidator> (name: string, validator: T): T {
    const pointer = `/${name}`
    if (has(this.typeValidators, pointer)) return get(this.typeValidators, pointer)
    set(this.typeValidators, pointer, validator)
    return validator
  }

  keys (validators: { [key: string]: IValidator }) {
    Object.keys(validators).forEach(key => set(this.typeValidators, `/${key}`, validators[key]))
    return this
  }

  array (name: string): ArrayValidator {
    return this.addEntryValidator<ArrayValidator>(name, new ArrayValidator(getPath(name), this))
  }

  object (name: string): ObjectValidator {
    return this.addEntryValidator<ObjectValidator>(name, new ObjectValidator(getPath(name), this))
  }

  string (name: string): StringValidator {
    return this.addEntryValidator(name, new StringValidator(this))
  }

  date (name: string, format: DF = DF.ISO8601): DateValidator {
    return this.addEntryValidator(name, new DateValidator(format, this))
  }

  number (name: string, integer: boolean = false): NumberValidator {
    return this.addEntryValidator<NumberValidator>(name, new NumberValidator(integer, this))
  }

  boolean (name: string): BooleanValidator {
    return this.addEntryValidator <BooleanValidator>(name, new BooleanValidator(this))
  }

  // add validation rule requires
  validate (value: any, path: string = ""): IValidationResult {
    let result: IValidationResult = {success: true, messages: [], errors: []}

    // checking required properties
    this.requiredProps.forEach(property => {
      if (!has(value, `${path}/${property}`)) {
        result.success = false
        result.errors.push({params: {property}, dataPath: path, rule: "object.requires"})
      }
    })

    const superResult = super.validate(value, path)

    let propertiesResults: IValidationResult = {success: true, messages: [], errors: []}
    Object.keys(this.typeValidators).forEach(propertyName => {
      const path = [this.path, propertyName].join("/")
      if(has(value,path)){
        const propertyResult: IValidationResult = this.typeValidators[propertyName].validate(value, path)
        propertiesResults = combineValidationResults(propertiesResults, propertyResult)
      }
    })

    return combineValidationResults(propertiesResults, superResult, result)
  }
}
