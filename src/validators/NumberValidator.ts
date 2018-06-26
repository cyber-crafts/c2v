import { ValidatorBase } from "../ValidatorBase"
import { ContainingType } from "../intefaces"
import { number } from "../rules"

export default class NumberValidator extends ValidatorBase {

  constructor (integer: boolean = false, parent: ContainingType = null) {
    super(parent)

    // attaching type validator
    this.addValidator('number', number.number(), {})
    if (integer) this.addValidator('integer', number.integer(), {})
  }

  min (min: number, exclusive: boolean = false) {
    this.addValidator('min', number.min(min, exclusive), {min})
    return this
  }

  max (max: number, exclusive: boolean = false) {
    this.addValidator('max', number.max(max, exclusive), {max})
    return this
  }

  multipleOf (modulus: number) {
    this.addValidator('multipleOf', number.multipleOf(modulus), {modulus})
    return this
  }

  get type (): string {
    return "number"
  }
}
