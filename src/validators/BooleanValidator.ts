import { ValidatorBase } from "../ValidatorBase"
import { ContainingType } from "../intefaces"
import { boolean } from "../rules"

export default class BooleanValidator extends ValidatorBase {
  public type: string = "boolean"

  constructor (parent: ContainingType = null) {
    super(parent)
    // attaching type validator
    this.addValidator('boolean', boolean.boolean(), {})
  }

  isTrue () {
    this.addValidator('true', boolean.isTrue(), {})
    return this
  }
}
