import { has } from "json-pointer"
import { ITypeValidator } from "../../contracts"
import Context from "../../Context"

export default class SingleItemValidator {
  private readonly index: number
  public typeValidator: ITypeValidator

  constructor (index: number) {
    this.index = index
  }

  setValidator (validator: ITypeValidator) {
    this.typeValidator = validator
  }

  validate (value: any, path: string, context: Context): Promise<void>[] {
    let results: Promise<void>[] = []
    const dataPath = `${path}/${this.index}`
    if (!has(value, path) || !has(value, dataPath)) return results

    results = results.concat(this.typeValidator.validate(value, context, dataPath))
    return results
  }
}
