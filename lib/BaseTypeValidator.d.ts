import IValidate, { IRule, ITypeValidator } from './contracts';
import Context from './Context';
export declare abstract class BaseTypeValidator implements ITypeValidator {
    validationRules: {
        [key: string]: IValidate;
    };
    abstract readonly type: string;
    /**
     * adds a new rule to the validators set
     * @param func {IValidate} the rule name
     * @param name the name of validation rule
     * @deprecated will be removed in favor of addRule()
     * */
    attach(func: IValidate, name?: string): this;
    clone(): this;
    /**
     * adds a new validator to the validators set
     * */
    addRule(rule: IRule): this;
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
