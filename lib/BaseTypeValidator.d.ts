import { default as IValidationRule, ITypeValidator } from './contracts';
import Context from './Context';
export declare abstract class BaseTypeValidator implements ITypeValidator {
    validationRules: {
        [key: string]: IValidationRule;
    };
    abstract readonly type: string;
    /**
     * adds a new validator to the validators set
     * @param validator {IValidationRule} the rule name
     * @param name the name of validation rule
     * */
    attach(validator: IValidationRule, name?: string): this;
    /**
     * adds a new validator to the validators set
     * @param name the name of validation rule
     * @param validator {IValidationRule} the rule name
     * */
    protected addValidator(name: string, validator: IValidationRule): void;
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
