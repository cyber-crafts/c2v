import { ValidatorBase } from "../../ValidatorBase";
import AllItemsValidator from "./AllItemsValidator";
import { ContainingType, IValidationResult, IValidator } from "../../intefaces";
import SingleItemValidator from "./SingleItemValidator";
export default class ArrayValidator extends ValidatorBase {
    private readonly allItemsValidator;
    private readonly singleItemValidators;
    constructor(path?: string, parent?: ContainingType);
    minItems(limit: number): this;
    maxItems(limit: number): this;
    allItems(validator?: IValidator): AllItemsValidator;
    nth(index: number): SingleItemValidator;
    items(validators: {
        [key: string]: IValidator;
    }): this;
    readonly type: string;
    validate(value: any, path?: string): IValidationResult;
}
