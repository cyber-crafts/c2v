import { ITypeValidator, IValidationError, IValidationMessage, IValidationResult } from "./contracts"
import merge = require("lodash.merge")

export default class Context {
  private static _container: any = {}
  private _state: IValidationResult = { success: true, messages: [], errors: [] }
  private _data: any = {}

  public setData (data: any): this {
    this._data = merge(data, this.getData())
    return this
  }

  public getData () {
    return this._data
  }

  static bind (name: string | symbol, value: any) {
    this._container[ name ] = value
  }

  static get (name: string | symbol) {
    if (name in this._container)
      throw new Error(`identifier ${name.toString()} is NOT found in context`)
    return this._container[ name ]
  }

  get isValid (): boolean {
    return this._state.success
  }

  private invalidate () {
    this._state.success = false
  }

  addError (rule: string, dataPath: string, params: object = {}) {
    this._state.errors.push({ rule, dataPath, params })
    this.invalidate()
  }

  addMessage (code: string, params: object = {}) {
    this._state.messages.push({ code, params })
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

  async validate (schema: ITypeValidator, obj: unknown, data?: unknown): Promise<IValidationResult> {
    this.setData(data)
    await Promise.all(schema.validate(obj, this))
    return this.state
  }

  static async validate (schema: ITypeValidator, obj: unknown, data?: unknown): Promise<IValidationResult> {
    const c = new Context()
    return await c.validate(schema, obj, data)
  }
}
