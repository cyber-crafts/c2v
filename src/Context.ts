import { ITypeValidator, IValidationError, IValidationMessage, IValidationResult } from "./intefaces"

export default class Context {
  private _state: IValidationResult = {success: true, messages: [], errors: []}
  private _container: any

  bind (name: string, value: any) {
    this._container[name] = value
  }

  get (name: string) {
    return this._container[name]
  }

  get isValid (): boolean {
    return this._state.success
  }

  private invalidate () {
    this._state.success = false
  }

  addError (rule: string, dataPath: string, params: object = {}) {
    this._state.errors.push({rule, dataPath, params})
    this.invalidate()
  }

  addMessage (code: string, params: object = {}) {
    this._state.messages.push({code, params})
  }

  absorb (context: Context): void {
    this._state.errors = this.errors.concat(context.errors)
    this._state.messages = this.messages.concat(context.messages)
    if (this.errors.length > 0) this.invalidate()
  }

  get errors (): IValidationError[] {
    return this._state.errors
  }

  get messages (): IValidationMessage[] {
    return this._state.messages
  }

  get state (): IValidationResult {
    return this._state
  }

  async validate (schema: ITypeValidator, obj: object): Promise<IValidationResult> {
    await Promise.all(schema.validate(obj, this))
    return this.state
  }

  static async validate (schema: ITypeValidator, obj: object): Promise<IValidationResult> {
    const c = new Context()
    await Promise.all(schema.validate(obj, c))
    return c.state
  }
}
