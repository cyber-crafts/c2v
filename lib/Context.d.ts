import { ITypeValidator, IValidationError, IValidationMessage, IValidationResult } from './contracts';
export default class Context {
    private static _container;
    private _state;
    private _data;
    setData(data: any): this;
    getData(): any;
    static bind(name: string | symbol, value: any): void;
    static get(name: string | symbol): any;
    get isValid(): boolean;
    private invalidate;
    addError(rule: string, dataPath: string, params?: object): void;
    addMessage(code: string, params?: object): void;
    absorb(context: Context): void;
    get errors(): IValidationError[];
    get messages(): IValidationMessage[];
    get state(): IValidationResult;
    validate(schema: ITypeValidator, obj: object, data?: any): Promise<IValidationResult>;
    static validate(schema: ITypeValidator, obj: object, data?: any): Promise<IValidationResult>;
}
