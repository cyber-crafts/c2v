import { ObjectValidator, ArrayValidator } from "./typeValidators";
import Context from "./Context";
/**
 * the function that validates targeted value
 * @param value {any} the value under validation
 * @param obj {any} the parent object that holds the value
 * @param path {string} the path to the value on the parent object
 * @param context {Context} state of validation to attach messages and errors
 * @return {Promise}
 * return type was left
 * */
export default interface IValidationRule {
    (value: any, obj: any, path: string, context: Context): Promise<void>;
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
/**
 * @param promise {Promise<boolean> | boolean} usually what returned from IValidationRule
 */
export interface IValidationPromise {
    promise: Promise<boolean>;
    failError: IValidationError;
}
export declare enum DF {
    ISO8601 = "YYYY-MM-DD",
    Unix = "unix",
    Milliseconds = "milliseconds",
}
export declare type ContainingType = ObjectValidator | ArrayValidator;
export interface ITypeValidator {
    type: string;
    _: ContainingType;
    validate(value: any, context: Context, path?: string): Promise<void>[];
}
