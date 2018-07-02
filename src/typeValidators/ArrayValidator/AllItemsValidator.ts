import { get, has } from "json-pointer"
import { ContainingType, DF, ITypeValidator } from "../../intefaces"
import StringValidator from "../StringValidator"
import NumberValidator from "../NumberValidator"
import BooleanValidator from "../BooleanValidator"
import { DateValidator } from "../index"
import Context from "../../Context"

export default class AllItemsValidator {
  private readonly parent: ContainingType
  private typeValidator: ITypeValidator

  constructor (parent: ContainingType) {
    this.parent = parent
  }

  setTypeValidator<T extends ITypeValidator> (validator: T): T {
    this.typeValidator = validator
    return validator
  }

  string (): StringValidator {
    return this.setTypeValidator(new StringValidator(this.parent))
  }

  number (integer: boolean = false): NumberValidator {
    return this.setTypeValidator(new NumberValidator(integer, this.parent))
  }

  boolean (): BooleanValidator {
    return this.setTypeValidator(new BooleanValidator(this.parent))
  }

  date (format: DF = DF.ISO8601): DateValidator {
    return this.setTypeValidator(new DateValidator(format, this.parent))
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
