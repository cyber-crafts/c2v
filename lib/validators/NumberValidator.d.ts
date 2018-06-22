import { ValidatorBase } from "../ValidatorBase";
import { ContainingType } from "../intefaces";
export default class NumberValidator extends ValidatorBase {
    constructor(parent: ContainingType, integer?: boolean);
    min(min: number, exclusive?: boolean): this;
    max(max: number, exclusive?: boolean): this;
    multipleOf(modulus: number): this;
    readonly type: string;
}
