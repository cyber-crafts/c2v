import { ValidatorBase } from "../../ValidatorBase";
import AllItemsValidator from "./AllItemsValidator";
import { ContainingType, IValidationResult } from "../../intefaces";
import SingleItemValidator from "./SingleItemValidator";
export default class ArrayValidator extends ValidatorBase {
    private readonly allItemsValidator;
    private readonly singleItemValidators;
    constructor(path?: string, parent?: ContainingType);
    minItems(limit: number): this;
    maxItems(limit: number): this;
    allItems(): AllItemsValidator;
    nth(index: number): SingleItemValidator;
    readonly type: string;
    validate(value: any, path?: string): IValidationResult;
}
