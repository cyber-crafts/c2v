import { ContainingType, DF, IValidationResult, IValidator } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
import BooleanValidator from "../BooleanValidator";
import { DateValidator } from "../index";
export default class AllItemsValidator {
    private readonly parent;
    private typeValidator;
    constructor(parent: ContainingType);
    setTypeValidator<T extends IValidator>(validator: T): T;
    string(): StringValidator;
    number(integer?: boolean): NumberValidator;
    boolean(): BooleanValidator;
    date(format?: DF): DateValidator;
    validate(value: any, path: string): IValidationResult;
}
