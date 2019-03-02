import { BaseTypeValidator } from '../BaseTypeValidator'
import { ITypeValidator, IValidatorWrapper } from '../contracts'
import { get, has } from 'json-pointer'
import Context from '../Context'
import { sanitizePath } from '../utils'
import { cloneDeep } from 'lodash'

export default class ObjectValidator extends BaseTypeValidator {
  private requiredProps: string[] = []
  private keyValidators: { [ path: string ]: ITypeValidator } = {}

  constructor () {
    super()
    this.addRule({
      name: 'object',
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (typeof value !== 'object') context.addError('object.object', path)
      },
    })
  }

  get type (): string {
    return 'object'
  }

  requires (...properties: string[]) {
    this.requiredProps = this.requiredProps.concat(properties)
    return this
  }

  requiresIfAny (conditionalProps: string[] | string, validationRules: IValidatorWrapper[] | IValidatorWrapper) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [ conditionalProps ]
    const validationWrappers: IValidatorWrapper[] = (Array.isArray(validationRules)) ? validationRules : [ validationRules ]
    conditionalProperties.forEach(conditionalProperty => {
      this.addRule({
        name: 'requiresIfAny',
        func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
          for (let i = 0; i < validationWrappers.length; i++) {
            const wrapper = validationWrappers[ i ]

            let conditionalObject: any = undefined
            let isDataValidation = false
            if (wrapper.path.substr(0, 1) === '$') {
              conditionalObject = context.getData()
              isDataValidation = true
            } else {
              conditionalObject = obj
            }

            if (has(conditionalObject, sanitizePath(wrapper.path))) {
              const _context = new Context().setData(context.getData())
              await Promise.all(wrapper.validator.validate(conditionalObject, _context, sanitizePath(wrapper.path)))
              // if context is clean then the `conditionalProperty` should exist
              if (_context.isValid)
                if (!has(value, `/${conditionalProperty}`)) {
                  const errorParams: any = {
                    conditionalProperty,
                    assertionProperties: wrapper.path,
                  }
                  if (isDataValidation) {
                    errorParams.data = context.getData()
                  }
                  context.addError('object.requiresIfAny', path, errorParams)
                }
            }

          }
        },
      })
    })
    return this
  }

  requiresWithAny (conditionalProps: string[] | string, assertionPaths: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [ conditionalProps ]
    const assertionProperties: string[] = (Array.isArray(assertionPaths)) ? assertionPaths : [ assertionPaths ]
    conditionalProperties.forEach(conditionalProperty => {
      this.addRule({
        name: 'requiresWithAny',
        func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
          for (let i = 0; i < assertionProperties.length; i++)
            if (has(obj, assertionProperties[ i ]))
              if (!value.hasOwnProperty(conditionalProperty))
                context.addError('object.requiresWithAny', path, { conditionalProperty, assertionProperties })
        },
      })
    })
    return this
  }

  requiresWithAll (conditionalProps: string[] | string, assertionProps: string[] | string) {
    const conditionalProperties: string[] = (Array.isArray(conditionalProps)) ? conditionalProps : [ conditionalProps ]
    const assertionProperties: string[] = (Array.isArray(assertionProps)) ? assertionProps : [ assertionProps ]

    conditionalProperties.forEach(conditionalProperty => {
      this.addRule({
        name: 'requiresWithAll',
        func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
          for (let i = 0; i < assertionProperties.length; i++) {
            if (!has(obj, assertionProperties[ i ])) return
          }

          if (!value.hasOwnProperty(conditionalProperty))
            context.addError('object.requiresWithAll', path, { conditionalProperty, assertionProperties })
        },
      })
    })

    return this
  }

  addKey (name: string, validator: ITypeValidator): this {
    this.keyValidators[ name ] = validator
    return this
  }

  hasKey (name: string): boolean {
    return this.keyValidators.hasOwnProperty(name)
  }

  getKey (name: string): ITypeValidator {
    return this.keyValidators[ name ]
  }

  dropKey (name: string): this {
    delete this.keyValidators[ name ]
    return this
  }

  keys (validators: { [ key: string ]: ITypeValidator }): this {
    Object.keys(validators).forEach(key => this.addKey(key, validators[ key ]))
    return this
  }

  // add validation rule requires
  validate (obj: any, context: Context, path: string = ''): Promise<void>[] {
    obj = cloneDeep(obj)
    let results: Promise<void>[] = []

    // checking required properties
    this.requiredProps.forEach(property => {
      if (!has(obj, `${path}/${property}`) || get(obj, `${path}/${property}`) === null) {
        context.addError('object.requires', path, { property })
      }
    })

    const superResult = super.validate(obj, context, path)

    let propertiesResults: Promise<void>[] = []
    Object.keys(this.keyValidators).forEach(propertyName => {
      const typeValidator = this.keyValidators[ propertyName ]
      const propertyPath = [ path, propertyName ].join('/')
      if (has(obj, propertyPath) && get(obj, propertyPath) !== null) {
        propertiesResults = propertiesResults.concat(typeValidator.validate(obj, context, propertyPath))
      }
    })

    return propertiesResults.concat(superResult.concat(results))
  }
}
