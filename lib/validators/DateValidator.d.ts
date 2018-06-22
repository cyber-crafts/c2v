import { ValidatorBase } from "../ValidatorBase";
import { ContainingType, DF, IValidationResult } from "../intefaces";
import * as moment from "moment";
export default class DateValidator extends ValidatorBase {
    type: string;
    private readonly format;
    constructor(format?: DF, parent?: ContainingType);
    private parse(date);
    before(limit: string): this;
    after(limit: string): this;
    closerThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    furtherThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    validate(value: any, path?: string): IValidationResult;
}
