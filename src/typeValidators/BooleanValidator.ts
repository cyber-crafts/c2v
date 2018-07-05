import { BaseTypeValidator } from "../BaseTypeValidator"
import { ContainingType } from "../intefaces"
import { boolean } from "../rules"
import Context from "../Context"

export default class BooleanValidator extends BaseTypeValidator {
  public type: string = "boolean"

  constructor (parent: ContainingType = null) {
    super(parent)
    // attaching type validator
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void>=>{
      if(!boolean.boolean()(value)) context.addError('boolean.boolean',path,{})
    })
  }

  isTrue () {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void>=>{
      if(!boolean.isTrue()(value)) context.addError('boolean.true',path,{})
    })
    return this
  }
}
