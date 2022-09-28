import { BaseTypeValidator } from '../BaseTypeValidator';
export default class NumberValidator extends BaseTypeValidator {
    get type(): string;
    constructor(integer?: boolean);
    min(min: number, exclusive?: boolean): this;
    max(max: number, exclusive?: boolean): this;
    multipleOf(modulus: number): this;
}
