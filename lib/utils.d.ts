import { IValidationResult } from "./intefaces";
export declare const wrap: <T>(value: T) => Promise<T>;
export declare const success: () => IValidationResult;
export declare const elevatePaths: (basePath: string, validationResult: IValidationResult) => IValidationResult;
export declare const combineValidationResults: (...validationResults: IValidationResult[]) => IValidationResult;
