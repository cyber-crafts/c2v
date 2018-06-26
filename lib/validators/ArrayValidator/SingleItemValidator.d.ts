import { ContainingType, IValidationResult, IValidator } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
export default class SingleItemValidator {
    private readonly parent;
    private readonly index;
    typeValidator: IValidator;
    constructor(index: number, parent: ContainingType);
    setValidator(validator: IValidator): void;
    string(): StringValidator;
    number(integer?: boolean): NumberValidator;
    validate(value: any, path: string): IValidationResult;
}
