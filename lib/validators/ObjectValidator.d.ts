import { ValidatorBase } from "../ValidatorBase";
import { ContainingType, DF, IValidationResult, IValidator } from "../intefaces";
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./";
export default class ObjectValidator extends ValidatorBase {
    protected readonly path: string;
    private requiredProps;
    private typeValidators;
    constructor(path?: string, parent?: ContainingType);
    readonly type: string;
    requires(...properties: string[]): this;
    requiresWithAny(conditionalProps: string[] | string, assertionPaths: string[] | string): this;
    requiresWithAll(conditionalProps: string[] | string, assertionProps: string[] | string): this;
    addTypeValidator<T extends IValidator>(name: string, validator: T): T;
    array(name: string): ArrayValidator;
    object(name: string): ObjectValidator;
    string(name: string): StringValidator;
    date(name: string, format?: DF): DateValidator;
    number(name: string, integer?: boolean): NumberValidator;
    boolean(name: string): BooleanValidator;
    validate(value: any, path?: string): IValidationResult;
}
