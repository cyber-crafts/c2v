import { ITypeValidator, IValidationResult } from "./intefaces"
import { BaseTypeValidator } from "./BaseTypeValidator"

export default class Context {
  state: IValidationResult = {success: true, messages: [], errors: []}

  addError (rule: string, dataPath: string, params: object = {}) {
    this.state.errors.push({rule, dataPath, params})
    this.invalidate()
  }

  addMessage (code: string, params: object = {}) {
    this.state.messages.push({code, params})
  }

  invalidate () {
    this.state.success = false
  }

  getResult (): IValidationResult {
    return this.state
  }

  async validate (schema: BaseTypeValidator, obj: object): Promise<IValidationResult> {
    await Promise.all(schema.validate(obj, this))
    return this.getResult()
  }

  static async validate (schema: BaseTypeValidator, obj: object): Promise<IValidationResult> {
    const c = new Context()
    await Promise.all(schema.validate(obj, c))
    return c.getResult()
  }
}
