import * as typeValidators from './typeValidators';
import * as contracts from './contracts';
export { default as Context } from './Context';
export declare const validators: typeof typeValidators;
export { contracts };
export default class {
    static get str(): typeValidators.StringValidator;
    static get int(): typeValidators.NumberValidator;
    static get num(): typeValidators.NumberValidator;
    static get date(): typeValidators.DateValidator;
    static get bool(): typeValidators.BooleanValidator;
    static get arr(): typeValidators.ArrayValidator;
    static get obj(): typeValidators.ObjectValidator;
}
