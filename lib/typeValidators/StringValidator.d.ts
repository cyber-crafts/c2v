import { BaseTypeValidator } from '../BaseTypeValidator';
export default class StringValidator extends BaseTypeValidator {
    constructor();
    length(limit: number): this;
    minLength(limit: number): this;
    maxLength(limit: number): this;
    matches(pattern: RegExp): this;
    url(): this;
    email(): this;
    confirmed(): this;
    get type(): string;
}
