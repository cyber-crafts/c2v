import * as validators from "./validators"
import { DF } from "./intefaces"

export default {
  ...validators,
  str: () => new validators.StringValidator(),
  int: () => new validators.NumberValidator(true),
  num: () => new validators.NumberValidator(),
  date: (format: DF = DF.ISO8601) => new validators.DateValidator(format),
  bool: () => new validators.BooleanValidator(),
  arr: () => new validators.ArrayValidator(),
  obj: () => new validators.ObjectValidator(),
}
