import { IValidationError, IValidationMessage, IValidationResult } from "./intefaces";
import { BaseTypeValidator } from "./BaseTypeValidator";
export default class Context {
    private _state;
    private _container;
    bind(name: string, value: any): void;
    get(name: string): any;
    readonly isValid: boolean;
    private invalidate();
    addError(rule: string, dataPath: string, params?: object): void;
    addMessage(code: string, params?: object): void;
    absorb(context: Context): void;
    readonly errors: IValidationError[];
    readonly messages: IValidationMessage[];
    readonly state: IValidationResult;
    validate(schema: BaseTypeValidator, obj: object): Promise<IValidationResult>;
    static validate(schema: BaseTypeValidator, obj: object): Promise<IValidationResult>;
}
