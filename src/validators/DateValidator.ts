import { ValidatorBase } from "../ValidatorBase"
import { ContainingType, DF, IValidationResult } from "../intefaces"
import * as moment from "moment"
import { date } from "../rules"

export default class DateValidator extends ValidatorBase {
  public type: string = "date"
  private readonly format: DF

  constructor (format: DF = DF.ISO8601, parent: ContainingType= null) {
    super(parent)
    this.format = format
  }

  private parse (date: string | number): moment.Moment {
    if (typeof date === "number" && this.format === DF.Unix) return moment.unix(date)
    return moment(date, this.format)
  }

  before (limit: string) {
    this.addValidator('before', date.before(this.parse(limit)), {date: limit})
    return this
  }

  after (limit: string) {
    this.addValidator('after', date.after(this.parse(limit)), {limit})
    return this
  }

  closerThanFromNow (amount: number, unit: moment.unitOfTime.Base) {
    this.addValidator('closerThanFromNow', date.closerThanFromNow(amount, unit), {amount, unit})
    return this
  }

  furtherThanFromNow (amount: number, unit: moment.unitOfTime.Base) {
    this.addValidator('furtherThanFromNow', date.furtherThanFromNow(amount, unit), {amount, unit})
    return this
  }

  validate (value: any, path: string = ""): IValidationResult {
    return super.validate(this.parse(value), path)
  }
}
