import ObjectValidator from "./validators/ObjectValidator";
import ArrayValidator from "./validators/ArrayValidator";
export interface IValidator {
    type: string;
    _: ContainingType;
    validate(value: any, path: string): IValidationResult;
}
export default interface IValidationRule {
    (value: any, obj: any, path: string): boolean;
}
export interface IValidationResult {
    success: boolean;
    messages: IValidationMessage[];
    errors: IValidationError[];
}
export interface IValidationMessage {
    code: string;
    params: object;
}
export interface IValidationError {
    rule: string;
    dataPath: string;
    params: object;
}
export declare enum DF {
    ISO8601 = "YYYY-MM-DD",
    Unix = "unix",
    Milliseconds = "milliseconds",
}
export declare type ContainingType = ObjectValidator | ArrayValidator;
export interface IAttachable {
    addEntryValidator<T extends IValidator>(name: string | number, validator: T): T;
}
export interface IValidationRuleData {
    name: string;
    validate: IValidationRule;
    params: object;
}
