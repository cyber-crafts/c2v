import { default as IValidationRule, ContainingType, ITypeValidator } from "./intefaces";
import Context from "./Context";
export declare abstract class BaseTypeValidator implements ITypeValidator {
    protected validationRules: IValidationRule[];
    protected readonly parent: ContainingType;
    readonly abstract type: string;
    constructor(parent?: ContainingType);
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
     * @returns IValidationResult
     * */
    validate(obj: object, context: Context, path?: string): Promise<void>[];
    readonly _: ContainingType;
}
