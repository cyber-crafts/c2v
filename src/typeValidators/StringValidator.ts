import { BaseTypeValidator } from "../BaseTypeValidator"
import { string } from "../rules"
import Context from "../Context"

export default class StringValidator extends BaseTypeValidator {

  constructor () {
    super()
    this.addRule({
      name: "string",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (typeof value !== "string") context.addError("string.string", path)
      },
    })
  }

  length (limit: number) {
    this.addRule({
      name: "length",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.length(limit)(value))
          context.addError("string.length", path, { limit })
      },
    })
    return this
  }

  minLength (limit: number) {
    this.addRule({
      name: "minLength",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.minLength(limit)(value))
          context.addError("string.minLength", path, { limit })
      },
    })
    return this
  }

  maxLength (limit: number) {
    this.addRule({
      name: "maxLength",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.maxLength(limit)(value))
          context.addError("string.maxLength", path, { limit })
      },
    })
    return this
  }

  matches (pattern: RegExp) {
    this.addRule({
      name: "matches",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.matches(pattern)(value))
          context.addError("string.matches", path, { pattern: pattern.toString() })
      },
    })
    return this
  }


  url () {
    this.addRule({
      name: "url",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.url()(value))
          context.addError("string.url", path, {})
      },
    })
    return this
  }

  email () {
    this.addRule({
      name: "email",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.email()(value))
          context.addError("string.email", path, {})
      },
    })
    return this
  }

  confirmed () {
    this.addRule({
      name: "confirmed",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!string.confirmed()(value, obj, path))
          context.addError("string.confirmed", path, {})
      },
    })
    return this
  }

  get type (): string {
    return "string"
  }
}

