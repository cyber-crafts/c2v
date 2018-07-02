import { BaseTypeValidator } from "../BaseTypeValidator";
import { ArrayValidator, BooleanValidator, DateValidator, NumberValidator, StringValidator } from "./";
import { ContainingType, DF, ITypeValidator } from "../intefaces";
import Context from "../Context";
export default class ObjectValidator extends BaseTypeValidator {
    protected readonly path: string;
    private requiredProps;
    private typeValidators;
    constructor(path?: string, parent?: ContainingType);
    readonly type: string;
    requires(...properties: string[]): this;
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
