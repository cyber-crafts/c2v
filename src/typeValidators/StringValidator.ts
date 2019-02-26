import { BaseTypeValidator } from '../BaseTypeValidator'
import { string } from '../rules'
import Context from '../Context'

export default class StringValidator extends BaseTypeValidator {

  constructor () {
    super()
    this.addValidator('string', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (typeof value !== 'string') context.addError('string.string', path)
    })
  }

  length (limit: number) {
    this.addValidator('length', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.length(limit)(value))
        context.addError('string.length', path, { limit })
    })
    return this
  }

  minLength (limit: number) {
    this.addValidator('minLength', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.minLength(limit)(value))
        context.addError('string.minLength', path, { limit })
    })
    return this
  }

  maxLength (limit: number) {
    this.addValidator('maxLength', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.maxLength(limit)(value))
        context.addError('string.maxLength', path, { limit })
    })
    return this
  }

  matches (pattern: RegExp) {
    this.addValidator('matches', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.matches(pattern)(value))
        context.addError('string.matches', path, { pattern: pattern.toString() })
    })
    return this
  }


  url () {
    this.addValidator('url', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.url()(value))
        context.addError('string.url', path, {})
    })
    return this
  }

  email () {
    this.addValidator('email', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.email()(value))
        context.addError('string.email', path, {})
    })
    return this
  }

  confirmed () {
    this.addValidator('confirmed', async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!string.confirmed()(value, obj, path))
        context.addError('string.confirmed', path, {})
    })
    return this
  }

  get type (): string {
    return 'string'
  }
}

