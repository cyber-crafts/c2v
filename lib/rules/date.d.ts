import * as moment from "moment";
declare const _default: {
    before: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    after: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    closerThanFromNow: (amount: number, unit: "s" | "day" | "hour" | "minute" | "month" | "second" | "year" | "m" | "h" | "d" | "M" | "y" | "years" | "months" | "week" | "weeks" | "w" | "days" | "hours" | "minutes" | "seconds" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
    furtherThanFromNow: (amount: number, unit: "s" | "day" | "hour" | "minute" | "month" | "second" | "year" | "m" | "h" | "d" | "M" | "y" | "years" | "months" | "week" | "weeks" | "w" | "days" | "hours" | "minutes" | "seconds" | "millisecond" | "milliseconds" | "ms") => (value: moment.Moment) => boolean;
};
export default _default;
