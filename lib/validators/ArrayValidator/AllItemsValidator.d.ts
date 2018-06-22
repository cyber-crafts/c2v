import { ContainingType, IValidationResult } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
export default class AllItemsValidator {
    private readonly parent;
    private typeValidator;
    constructor(parent: ContainingType);
    readonly string: StringValidator;
    number(integer?: boolean): NumberValidator;
    validate(value: any, path: string): IValidationResult;
}
