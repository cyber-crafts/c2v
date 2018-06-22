import { ValidatorBase } from "../ValidatorBase";
import { ContainingType } from "../intefaces";
export default class BooleanValidator extends ValidatorBase {
    type: string;
    constructor(parent?: ContainingType);
    isTrue(): this;
}
