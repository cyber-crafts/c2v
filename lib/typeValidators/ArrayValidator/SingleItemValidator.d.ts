import { ContainingType, ITypeValidator } from "../../intefaces";
import StringValidator from "../StringValidator";
import NumberValidator from "../NumberValidator";
import Context from "../../Context";
export default class SingleItemValidator {
    private readonly parent;
    private readonly index;
    typeValidator: ITypeValidator;
    constructor(index: number, parent: ContainingType);
    setValidator(validator: ITypeValidator): void;
    string(): StringValidator;
    number(integer?: boolean): NumberValidator;
    validate(value: any, path: string, context: Context): Promise<void>[];
}
