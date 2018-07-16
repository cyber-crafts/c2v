import * as moment from "moment";
declare const _default: {
    before: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    after: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    closerThanFromNow: (amount: number, unit: "year" | "years" | "y" | "month" | "months" | "M" | "week" | "weeks" | "w" | "day" | "days" | "d" | "hour" | "hours" | "h" | "minute" | "minutes" | "m" | "second" | "seconds" | "s" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
    furtherThanFromNow: (amount: number, unit: "year" | "years" | "y" | "month" | "months" | "M" | "week" | "weeks" | "w" | "day" | "days" | "d" | "hour" | "hours" | "h" | "minute" | "minutes" | "m" | "second" | "seconds" | "s" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
};
export default _default;
