import { IValidationResult } from "./intefaces";
import { BaseTypeValidator } from "./BaseTypeValidator";
export default class Context {
    state: IValidationResult;
    addError(rule: string, dataPath: string, params?: object): void;
    addMessage(code: string, params?: object): void;
    invalidate(): void;
    getResult(): IValidationResult;
    validate(schema: BaseTypeValidator, obj: object): Promise<IValidationResult>;
    static validate(schema: BaseTypeValidator, obj: object): Promise<IValidationResult>;
}
