import { BaseTypeValidator } from "../BaseTypeValidator"
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./"
import { ContainingType, DF, ITypeValidator, IValidatorWrapper } from "../intefaces"
import { get, has, set } from "json-pointer"
import Context from "../Context"

const getPath = (name: string): string => (name.charAt(0) === "/") ? name : "/" + name

export default class ObjectValidator extends BaseTypeValidator {
  private requiredProps: string[] = []
  private typeValidators: { [path: string]: ITypeValidator } = {}

  constructor (parent: ContainingType = null) {
    super(parent)
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (typeof value !== "object") context.addError('object.object', path)
    })
  }

  get type (): string {
    return "object"
  }

  requires (...properties: string[]) {
    this.requiredProps = this.requiredProps.concat(properties)
    return this
  }

  requiresIfAny (conditionalProps: string[] | string, validationRules: IValidatorWrapper[] | IValidatorWrapper) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps]
    const validationWrappers: IValidatorWrapper[] = (Array.isArray(validationRules)) ? validationRules : [validationRules]
    conditionalProperties.forEach(conditionalProperty => {
      this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        for (let i = 0; i < validationWrappers.length; i++) {
          const wrapper = validationWrappers[i]
          if (has(obj, wrapper.path)) {
            const _context = new Context()
            await Promise.all(wrapper.validator.validate(obj, _context, wrapper.path))
            if (_context.isValid)
              if (!has(value, `/${conditionalProperty}`)) {
                context.addError('object.requiresIfAny', path, {conditionalProperty, assertionProperties: wrapper.path})
              }
          }
        }
      })
    })
    return this
  }

  requiresWithAny (conditionalProps: string[] | string, assertionPaths: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps]
    const assertionProperties: string[] = (Array.isArray(assertionPaths)) ? assertionPaths : [assertionPaths]
    conditionalProperties.forEach(conditionalProperty => {
      this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        for (let i = 0; i < assertionProperties.length; i++)
          if (has(obj, assertionProperties[i]))
            if (!value.hasOwnProperty(conditionalProperty))
              context.addError('object.requiresWithAny', path, {conditionalProperty, assertionProperties})
      })
    })
    return this
  }

  requiresWithAll (conditionalProps: string[] | string, assertionProps: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps]
    const assertionProperties: string[] = (Array.isArray(assertionProps)) ? assertionProps : [assertionProps]

    conditionalProperties.forEach(conditionalProperty => {
      this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        for (let i = 0; i < assertionProperties.length; i++){
          if (!has(obj, assertionProperties[i])) return
        }

        if (!value.hasOwnProperty(conditionalProperty))
          context.addError('object.requiresWithAll', path, {conditionalProperty, assertionProperties})
      })
    })

    return this
  }

  addEntryValidator<T extends ITypeValidator> (name: string, validator: T): T {
    const pointer = getPath(name)
    if (has(this.typeValidators, pointer)) return get(this.typeValidators, pointer)
    set(this.typeValidators, pointer, validator)
    return validator
  }

  keys (validators: { [key: string]: ITypeValidator }) {
    Object.keys(validators).forEach(key => this.addEntryValidator(key, validators[key]))
    return this
  }

  array (name: string): ArrayValidator {
    return this.addEntryValidator(name, new ArrayValidator(getPath(name), this))
  }

  object (name: string): ObjectValidator {
    return this.addEntryValidator(name, new ObjectValidator(this))
  }

  string (name: string): StringValidator {
    return this.addEntryValidator(name, new StringValidator(this))
  }

  date (name: string, format: DF = DF.ISO8601): DateValidator {
    return this.addEntryValidator(name, new DateValidator(format, this))
  }

  number (name: string, integer: boolean = false): NumberValidator {
    return this.addEntryValidator(name, new NumberValidator(integer, this))
  }

  boolean (name: string): BooleanValidator {
    return this.addEntryValidator(name, new BooleanValidator(this))
  }

  // add validation rule requires
  validate (value: any, context: Context, path: string = ""): Promise<void>[] {
    let results: Promise<void>[] = []

    // checking required properties
    this.requiredProps.forEach(property => {
      if (!has(value, `${path}/${property}`) || get(value, `${path}/${property}`) === null) {
        context.addError("object.requires", path, {property})
      }
    })

    const superResult = super.validate(value, context, path)

    let propertiesResults: Promise<void>[] = []
    Object.keys(this.typeValidators).forEach(propertyName => {
      const typeValidator = this.typeValidators[propertyName]
      const propertyPath = [path, propertyName].join("/")
      if (has(value, propertyPath) && get(value, propertyPath) !== null) {
        propertiesResults = propertiesResults.concat(typeValidator.validate(value, context, propertyPath))
      }
    })

    return propertiesResults.concat(superResult.concat(results))
  }
}
