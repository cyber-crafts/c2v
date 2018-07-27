import { BaseTypeValidator } from "../BaseTypeValidator";
export default class NumberValidator extends BaseTypeValidator {
    constructor(integer?: boolean);
    readonly type: string;
    min(min: number, exclusive?: boolean): this;
    max(max: number, exclusive?: boolean): this;
    multipleOf(modulus: number): this;
}
