import { ContainingType, IValidationResult } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
export default class SingleItemValidator {
    private readonly parent;
    private index;
    private typeValidator;
    constructor(index: number, parent: ContainingType);
    readonly string: StringValidator;
    readonly number: NumberValidator;
    validate(value: any, path: string): IValidationResult;
}
