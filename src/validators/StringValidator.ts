import { ValidatorBase } from "../ValidatorBase"
import { string } from "../rules"

export default class StringValidator extends ValidatorBase {

  /**
   * checks if
   * @param limit {number}
   * @return StringValidator
   * */
  length (limit: number) {
    this.addValidator('length', string.length(limit), {limit: limit})
    return this
  }

  minLength (limit: number) {
    this.addValidator('minLength', string.minLength(limit), {limit})
    return this
  }

  maxLength (limit: number) {
    this.addValidator('maxLength', string.maxLength(limit), {limit})
    return this
  }

  matches (pattern: RegExp) {
    this.addValidator('matches', string.matches(pattern), {pattern: pattern.toString()})
    return this
  }

  url () {
    this.addValidator('url', string.url(), {})
    return this
  }

  email () {
    this.addValidator('email', string.email(), {})
    return this
  }

  confirmed () {
    this.addValidator('confirmed', string.confirmed(), {})
    return this
  }

  get type (): string {
    return "string"
  }
}

