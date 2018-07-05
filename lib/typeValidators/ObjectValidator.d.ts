import { BaseTypeValidator } from "../BaseTypeValidator";
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./";
import { ContainingType, DF, ITypeValidator, IValidationRuleWrapper } from "../intefaces";
import Context from "../Context";
export default class ObjectValidator extends BaseTypeValidator {
    private requiredProps;
    private typeValidators;
    constructor(parent?: ContainingType);
    readonly type: string;
    requires(...properties: string[]): this;
    requiresIfAny(conditionalProps: string[] | string, validationRules: IValidationRuleWrapper[] | IValidationRuleWrapper): this;
    requiresWithAny(conditionalProps: string[] | string, assertionPaths: string[] | string): this;
    requiresWithAll(conditionalProps: string[] | string, assertionProps: string[] | string): this;
    addEntryValidator<T extends ITypeValidator>(name: string, validator: T): T;
    keys(validators: {
        [key: string]: ITypeValidator;
    }): this;
    array(name: string): ArrayValidator;
    object(name: string): ObjectValidator;
    string(name: string): StringValidator;
    date(name: string, format?: DF): DateValidator;
    number(name: string, integer?: boolean): NumberValidator;
    boolean(name: string): BooleanValidator;
    validate(value: any, context: Context, path?: string): Promise<void>[];
}
