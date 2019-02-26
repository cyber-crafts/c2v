import { ITypeValidator } from '../../contracts';
import Context from '../../Context';
export default class SingleItemValidator {
    private readonly index;
    typeValidator: ITypeValidator;
    constructor(index: number);
    setValidator(validator: ITypeValidator): void;
    validate(value: any, path: string, context: Context): Promise<void>[];
}
