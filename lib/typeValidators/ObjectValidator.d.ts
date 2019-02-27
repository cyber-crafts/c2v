import { BaseTypeValidator } from '../BaseTypeValidator';
import { ITypeValidator, IValidatorWrapper } from '../contracts';
import Context from '../Context';
export default class ObjectValidator extends BaseTypeValidator {
    private requiredProps;
    private keyValidators;
    constructor();
    readonly type: string;
    requires(...properties: string[]): this;
    requiresIfAny(conditionalProps: string[] | string, validationRules: IValidatorWrapper[] | IValidatorWrapper): this;
    requiresWithAny(conditionalProps: string[] | string, assertionPaths: string[] | string): this;
    requiresWithAll(conditionalProps: string[] | string, assertionProps: string[] | string): this;
    addKey(name: string, validator: ITypeValidator): this;
    hasKey(name: string): boolean;
    getKey(name: string): ITypeValidator;
    dropKey(name: string): this;
    keys(validators: {
        [key: string]: ITypeValidator;
    }): this;
    validate(obj: any, context: Context, path?: string): Promise<void>[];
}
