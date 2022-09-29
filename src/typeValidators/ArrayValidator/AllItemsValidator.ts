import { get, has } from "json-pointer"
import { ITypeValidator } from "../../contracts"
import Context from "../../Context"

export default class AllItemsValidator {
  private typeValidator: ITypeValidator

  setTypeValidator<T extends ITypeValidator> (validator: T): T {
    this.typeValidator = validator
    return validator
  }

  validate (value: any, context: Context, path: string): Promise<void>[] {
    let result: Promise<void>[] = []
    if (!has(value, path)) return result
    const array: Array<any> = get(value, path)

    if (this.typeValidator) {
      array.forEach((item, index) => {
        result = result.concat(this.typeValidator.validate(value, context, `${path}/${index}`))
      })
    }
    return result
  }
}
