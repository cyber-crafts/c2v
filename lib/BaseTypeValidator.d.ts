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
     * @deprecated will be removed in favor of addRule()
     * */
    attach(validator: IValidationRule, name?: string): this;
    /**
     * adds a new validator to the validators set
     * @param name the name of validation rule
     * @param validator {IValidationRule} the rule name
     * */
    addRule(name: string, validator: IValidationRule): void;
    /**
     * removes a validationRule with specified name
     * @param name the name of validation rule
     * */
    removeRule(name: string): void;
    /**
     * checks if a validationRule exists
     * @param name the name of validation rule
     * */
    hasRule(name: string): boolean;
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
