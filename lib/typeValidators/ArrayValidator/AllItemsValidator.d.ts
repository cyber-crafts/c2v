import { ITypeValidator } from '../../contracts';
import Context from '../../Context';
export default class AllItemsValidator {
    private typeValidator;
    setTypeValidator<T extends ITypeValidator>(validator: T): T;
    validate(value: any, context: Context, path: string): Promise<void>[];
}
