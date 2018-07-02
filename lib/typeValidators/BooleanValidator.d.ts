import { BaseTypeValidator } from "../BaseTypeValidator";
import { ContainingType } from "../intefaces";
export default class BooleanValidator extends BaseTypeValidator {
    type: string;
    constructor(parent?: ContainingType);
    isTrue(): this;
}
