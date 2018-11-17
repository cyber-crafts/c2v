import { BaseTypeValidator } from '../BaseTypeValidator'
import { get, set } from 'json-pointer'
import { DF } from '../contracts'
import * as moment from 'moment'
import { date } from '../rules'
import Context from '../Context'
import { cloneDeep } from 'lodash'

export default class DateValidator extends BaseTypeValidator {
  public type: string = 'date'
  private _format: DF

  constructor (format: DF = DF.ISO8601) {
    super()
    this._format = format
  }

  private parse (date: string | number): moment.Moment {
    if (typeof date === 'number' && this._format === DF.Unix) return moment.unix(date)
    return moment(date, this._format)
  }

  format (format: DF) {
    this._format = format
    return this
  }

  before (limit: string) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!date.before(this.parse(limit))(value))
        context.addError('date.before', path, { limit })
    })
    return this
  }

  after (limit: string) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!date.after(this.parse(limit))(value))
        context.addError('date.after', path, { limit })
    })
    return this
  }

  closerThanFromNow (amount: number, unit: moment.unitOfTime.Base) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!date.closerThanFromNow(amount, unit)(value))
        context.addError('date.closerThanFromNow', path, { amount, unit })
    })
    return this
  }

  furtherThanFromNow (amount: number, unit: moment.unitOfTime.Base) {
    this.addValidator(async (value: any, obj: any, path: string, context: Context): Promise<void> => {
      if (!date.furtherThanFromNow(amount, unit)(value))
        context.addError('date.furtherThanFromNow', path, { amount, unit })
    })
    return this
  }

  validate (obj: any, context: Context, path: string = ''): Promise<void>[] {
    obj = cloneDeep(obj)

    if (path !== '') {
      set(obj, path, this.parse(get(obj, path)))
      return super.validate(obj, context, path)
    } else {
      return super.validate(this.parse(obj), context, path)
    }
  }
}
