import { BaseTypeValidator } from "../BaseTypeValidator";
import { ContainingType } from "../intefaces";
export default class StringValidator extends BaseTypeValidator {
    constructor(parent?: ContainingType);
    length(limit: number): this;
    minLength(limit: number): this;
    maxLength(limit: number): this;
    matches(pattern: RegExp): this;
    url(): this;
    email(): this;
    confirmed(): this;
    readonly type: string;
}
