import { ITypeValidator, IValidationError, IValidationMessage, IValidationResult } from "./intefaces";
export default class Context {
    private _state;
    private static _container;
    static bind(name: string, value: any): void;
    static get(name: string): any;
    readonly isValid: boolean;
    private invalidate();
    addError(rule: string, dataPath: string, params?: object): void;
    addMessage(code: string, params?: object): void;
    absorb(context: Context): void;
    readonly errors: IValidationError[];
    readonly messages: IValidationMessage[];
    readonly state: IValidationResult;
    validate(schema: ITypeValidator, obj: object): Promise<IValidationResult>;
    static validate(schema: ITypeValidator, obj: object): Promise<IValidationResult>;
}
