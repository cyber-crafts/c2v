import { default as IValidationRule, ContainingType, IValidationResult, IValidator, IValidationRuleData } from "./intefaces";
export declare abstract class ValidatorBase implements IValidator {
    protected validators: IValidationRuleData[];
    protected readonly parent: ContainingType;
    readonly abstract type: string;
    constructor(parent?: ContainingType);
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRuleData} the rule name
     * */
    attach(validator: IValidationRuleData): this;
    /**
     * adds a new validator to the existing validators array
     * @param ruleName {string} the rule name
     * @param validator {IValidationRule} the rule name
     * @param params {object} the params used to customize this validator
     * @param allowsMultiple {boolean} specifies if this rule can be attached multiple times to the same validator
     * */
    protected addValidator(ruleName: string, validator: IValidationRule, params: object, allowsMultiple?: boolean): void;
    /**
     * validates the target property and run it through all its validators if it exists
     * @param obj {object} the whole object under validation
     * @param path {string = ""} the path to the property under validation
     * @returns IValidationResult
     * */
    validate(obj: object, path?: string): IValidationResult;
    in(items: Array<any>): this;
    on(path: string): this;
    readonly _: ContainingType;
}
