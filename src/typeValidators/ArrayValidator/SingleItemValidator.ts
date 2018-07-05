import { has } from "json-pointer"
import { ContainingType, ITypeValidator } from "../../intefaces"
import StringValidator from "../StringValidator"
import NumberValidator from "../NumberValidator"
import  Context  from "../../Context"

export default class SingleItemValidator {
  private readonly parent: ContainingType
  private readonly index: number
  public typeValidator: ITypeValidator

  constructor (index: number, parent: ContainingType) {
    this.index = index
    this.parent = parent
  }

  setValidator (validator: ITypeValidator) {
    this.typeValidator = validator
  }

  string (): StringValidator {
    const tv = new StringValidator(this.parent)
    this.typeValidator = tv
    return tv
  }

  number (integer: boolean = false): NumberValidator {
    const nv = new NumberValidator(integer, this.parent)
    this.typeValidator = nv
    return nv
  }

  validate (value: any, path: string, context: Context): Promise<void>[] {
    let results: Promise<void>[] = []
    const dataPath = `${path}/${this.index}`
    if (!has(value, path) || !has(value, dataPath)) return results

    results = results.concat(this.typeValidator.validate(value, context, dataPath))
    return results
  }
}
