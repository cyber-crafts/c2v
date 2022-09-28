import moment from "moment";
declare const _default: {
    before: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    after: (limit: moment.Moment) => (value: moment.Moment) => boolean;
    closerThanFromNow: (amount: number, unit: moment.unitOfTime.Base) => (value: moment.Moment) => boolean;
    furtherThanFromNow: (amount: number, unit: moment.unitOfTime.Base) => (value: moment.Moment) => boolean;
};
export default _default;
