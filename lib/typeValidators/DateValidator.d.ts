import { BaseTypeValidator } from "../BaseTypeValidator";
import { ContainingType, DF } from "../intefaces";
import * as moment from "moment";
import Context from "../Context";
export default class DateValidator extends BaseTypeValidator {
    type: string;
    private _format;
    constructor(format?: DF, parent?: ContainingType);
    private parse(date);
    format(format: DF): this;
    before(limit: string): this;
    after(limit: string): this;
    closerThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    furtherThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    validate(value: any, context: Context, path?: string): Promise<void>[];
}
