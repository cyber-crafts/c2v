import { BaseTypeValidator } from "../BaseTypeValidator"
import { boolean } from "../rules"
import Context from "../Context"

export default class BooleanValidator extends BaseTypeValidator {
  public type: string = "boolean"

  constructor () {
    super()
    // attaching type validator
    this.addValidator('bool',async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!boolean.boolean()(value)) context.addError('boolean.boolean', path, {})
    })
  }

  isTrue () {
    this.addValidator('isTrue',async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!boolean.isTrue()(value)) context.addError('boolean.true', path, {})
    })
    return this
  }
}
