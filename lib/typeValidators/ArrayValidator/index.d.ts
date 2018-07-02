import { BaseTypeValidator } from "../../BaseTypeValidator";
import AllItemsValidator from "./AllItemsValidator";
import { ContainingType, ITypeValidator } from "../../intefaces";
import SingleItemValidator from "./SingleItemValidator";
import Context from "../../Context";
export default class ArrayValidator extends BaseTypeValidator {
    private readonly allItemsValidator;
    private readonly singleItemValidators;
    constructor(path?: string, parent?: ContainingType);
    minItems(limit: number): this;
    maxItems(limit: number): this;
    allItems(validator?: ITypeValidator): AllItemsValidator;
    nth(index: number): SingleItemValidator;
    items(validators: {
        [key: string]: ITypeValidator;
    }): this;
    readonly type: string;
    validate(value: any, context: Context, path?: string): Promise<void>[];
}
