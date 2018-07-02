import { ContainingType, DF, ITypeValidator } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
import BooleanValidator from "../BooleanValidator";
import { DateValidator } from "../index";
import Context from "../../Context";
export default class AllItemsValidator {
    private readonly parent;
    private typeValidator;
    constructor(parent: ContainingType);
    setTypeValidator<T extends ITypeValidator>(validator: T): T;
    string(): StringValidator;
    number(integer?: boolean): NumberValidator;
    boolean(): BooleanValidator;
    date(format?: DF): DateValidator;
    validate(value: any, context: Context, path: string): Promise<void>[];
}
