import { BaseTypeValidator } from "../BaseTypeValidator"
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./"
import { ContainingType, DF, ITypeValidator } from "../intefaces"
import { get, has, set } from "json-pointer"
import Context from "../Context"

const getPath = (name: string): string => (name.charAt(0) === "/") ? name : "/" + name

export default class ObjectValidator extends BaseTypeValidator {
  protected readonly path: string
  private requiredProps: string[] = []
  private typeValidators: { [path: string]: ITypeValidator } = {}

  constructor (path: string = "", parent: ContainingType = null) {
    super(parent)
    this.path = path
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (typeof value !== "object") context.addError('object', path)
    })
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
        for (let i = 0; i < assertionProperties.length; i++)
          if (!has(obj, assertionProperties[i])) return

        if (value.hasOwnProperty(conditionalProperty))
          context.addError('object.requiresWithAll', path, {conditionalProperty, assertionProperties})
      })
    })

    return this
  }

  addEntryValidator<T extends ITypeValidator> (name: string, validator: T): T {
    const pointer = `/${name}`
    if (has(this.typeValidators, pointer)) return get(this.typeValidators, pointer)
    set(this.typeValidators, pointer, validator)
    return validator
  }

  keys (validators: { [key: string]: ITypeValidator }) {
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
  validate (value: any, context: Context, path: string = ""): Promise<void>[] {
    let results: Promise<void>[] = []

    // checking required properties
    this.requiredProps.forEach(property => {
      if (!has(value, `${path}/${property}`)) {
        context.addError("object.requires", path, {property})
      }
    })

    const superResult = super.validate(value, context, path)

    let propertiesResults: Promise<void>[] = []
    Object.keys(this.typeValidators).forEach(propertyName => {
      const path = [this.path, propertyName].join("/")
      if (has(value, path)) {
        propertiesResults = propertiesResults.concat(this.typeValidators[propertyName].validate(value, context, path))
      }
    })

    return propertiesResults.concat(superResult.concat(results))
  }
}
