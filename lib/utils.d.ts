import { IValidationResult } from "./intefaces";
export declare const elevatePaths: (basePath: string, validationResult: IValidationResult) => IValidationResult;
export declare const combineValidationResults: (...validationResults: IValidationResult[]) => IValidationResult;
