import { BaseTypeValidator } from "../../BaseTypeValidator";
import { ITypeValidator } from "../../contracts";
import Context from "../../Context";
export default class ArrayValidator extends BaseTypeValidator {
    private readonly allItemsValidator;
    private readonly singleItemValidators;
    constructor(path?: string);
    minItems(limit: number): this;
    maxItems(limit: number): this;
    allItems(validator?: ITypeValidator): this;
    items(validators: {
        [key: string]: ITypeValidator;
    }): this;
    get type(): string;
    validate(value: any, context: Context, path?: string): Promise<void>[];
}
