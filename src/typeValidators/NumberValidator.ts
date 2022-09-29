import { BaseTypeValidator } from "../BaseTypeValidator"
import { number } from "../rules"
import Context from "../Context"

export default class NumberValidator extends BaseTypeValidator {

  get type (): string {
    return "number"
  }

  constructor (integer = false) {
    super()

    // attaching type validator
    this.addRule({
      name: (integer) ? "integer" : "number",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!number.number()(value)) context.addError("number.number", path, {})
        if (integer && !number.integer()(value)) context.addError("number.integer", path, {})
      },
    })
  }

  min (min: number, exclusive = false) {
    this.addRule({
      name: "min",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!number.min(min, exclusive)(value)) context.addError("number.min", path, { limit: min, exclusive })
      },
    })
    return this
  }

  max (max: number, exclusive = false) {
    this.addRule({
      name: "max",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!number.max(max, exclusive)(value)) context.addError("number.max", path, { limit: max, exclusive })
      },
    })
    return this
  }

  multipleOf (modulus: number) {
    this.addRule({
      name: "multipleOf",
      func: async (value: any, obj: any, path: string, context: Context): Promise<void> => {
        if (!number.multipleOf(modulus)(value)) context.addError("number.multipleOf", path, { modulus })
      },
    })
    return this
  }
}
