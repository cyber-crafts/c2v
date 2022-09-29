import Context from "./Context";
/**
 * the function used validate a certain value
 * @param value {any} the value under validation
 * @param obj {any} the root object under validation
 * @param path {string} the path to the value on the parent object
 * @param context {Context} state of validation to attach messages and errors
 * @return {Promise}
 * return type was left
 * */
export default interface IValidate {
    (value: any, obj: any, path: string, context: Context): Promise<void>;
}
export interface IRule {
    name: string;
    func: IValidate;
}
export interface IValidationError {
    rule: string;
    dataPath: string;
    params: object;
}
export interface IValidationMessage {
    code: string;
    params: object;
}
export interface IValidationResult {
    success: boolean;
    messages: IValidationMessage[];
    errors: IValidationError[];
}
export declare enum DF {
    ISO8601 = "YYYY-MM-DD",
    Unix = "unix",
    Milliseconds = "milliseconds"
}
export interface ITypeValidator {
    type: string;
    validate(value: unknown, context: Context, path?: string): Promise<void>[];
}
export interface IValidatorWrapper {
    validator: ITypeValidator;
    path: string;
}
