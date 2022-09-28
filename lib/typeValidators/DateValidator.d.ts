import { BaseTypeValidator } from '../BaseTypeValidator';
import { DF } from '../contracts';
import moment from 'moment';
import Context from '../Context';
export default class DateValidator extends BaseTypeValidator {
    type: string;
    private _format;
    constructor(format?: DF);
    private parse;
    format(format: DF): this;
    before(limit: string): this;
    after(limit: string): this;
    closerThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    furtherThanFromNow(amount: number, unit: moment.unitOfTime.Base): this;
    validate(obj: any, context: Context, path?: string): Promise<void>[];
}
