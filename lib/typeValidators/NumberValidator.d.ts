import { BaseTypeValidator } from "../BaseTypeValidator";
import { ContainingType } from "../intefaces";
export default class NumberValidator extends BaseTypeValidator {
    constructor(integer?: boolean, parent?: ContainingType);
    readonly type: string;
    min(min: number, exclusive?: boolean): this;
    max(max: number, exclusive?: boolean): this;
    multipleOf(modulus: number): this;
}
