import { ValidatorBase } from "../ValidatorBase";
export default class StringValidator extends ValidatorBase {
    /**
     * checks if
     * @param limit {number}
     * @return StringValidator
     * */
    length(limit: number): this;
    minLength(limit: number): this;
    maxLength(limit: number): this;
    matches(pattern: RegExp): this;
    url(): this;
    email(): this;
    confirmed(): this;
    readonly type: string;
}
