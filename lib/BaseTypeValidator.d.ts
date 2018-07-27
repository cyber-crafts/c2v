import { default as IValidationRule, ITypeValidator } from "./contracts";
import Context from "./Context";
export declare abstract class BaseTypeValidator implements ITypeValidator {
    protected validationRules: IValidationRule[];
    abstract readonly type: string;
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    attach(validator: IValidationRule): this;
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    protected addValidator(validator: IValidationRule): void;
    in(...items: Array<any>): this;
    on(path: string): this;
    /**
     * validates the target property and run it through all its validators if it exists
     * @param obj {object} the whole object under validation
     * @param path {string = ""} the path to the property under validation
     * @param context
     * @param data a parameter that provides additional data to be used for validation
     * @returns IValidationResult
     * */
    validate(obj: object, context: Context, path?: string): Promise<void>[];
}
