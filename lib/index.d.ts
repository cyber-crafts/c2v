import * as typeValidators from './typeValidators';
import * as contracts from './contracts';
export { default as Context } from './Context';
export declare const validators: typeof typeValidators;
export { contracts };
export default class {
    static readonly str: typeValidators.StringValidator;
    static readonly int: typeValidators.NumberValidator;
    static readonly num: typeValidators.NumberValidator;
    static readonly date: typeValidators.DateValidator;
    static readonly bool: typeValidators.BooleanValidator;
    static readonly arr: typeValidators.ArrayValidator;
    static readonly obj: typeValidators.ObjectValidator;
}
