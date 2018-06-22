import * as moment from "moment"

export default {
  before: (limit: moment.Moment) => (value: moment.Moment): boolean => value.isBefore(limit),
  after: (limit: moment.Moment) => (value: moment.Moment): boolean => value.isAfter(limit),
  closerThanFromNow: (amount: number, unit: moment.unitOfTime.Base) =>
    (amount < 0) ?
      // checking the past check if given date is after the limit
      (value: moment.Moment): boolean => value.isAfter(moment().subtract(Math.abs(amount), unit)) :
      // checking the past check if given date is before the limit
      (value: moment.Moment): boolean => value.isSameOrBefore(moment().add(amount, unit)),

  furtherThanFromNow: (amount: number, unit: moment.unitOfTime.Base) =>
    (amount < 0) ?
      // checking the past check if given date is after the limit
      (value: moment.Moment): boolean => value.isBefore(moment().subtract(Math.abs(amount), unit)) :
      // checking the past check if given date is before the limit
      (value: moment.Moment): boolean => value.isSameOrAfter(moment().add(amount, unit)),
}
