import * as moment from 'moment';
declare const _default: {
    before: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    after: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    closerThanFromNow: (amount: number, unit: "s" | "m" | "h" | "d" | "M" | "y" | "year" | "years" | "month" | "months" | "week" | "weeks" | "w" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
    furtherThanFromNow: (amount: number, unit: "s" | "m" | "h" | "d" | "M" | "y" | "year" | "years" | "month" | "months" | "week" | "weeks" | "w" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
};
export default _default;
