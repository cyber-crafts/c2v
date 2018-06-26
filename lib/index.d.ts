import * as validators from "./validators";
import { DF } from "./intefaces";
declare const _default: {
    str: () => validators.StringValidator;
    int: () => validators.NumberValidator;
    num: () => validators.NumberValidator;
    date: (format?: DF) => validators.DateValidator;
    bool: () => validators.BooleanValidator;
    arr: () => validators.ArrayValidator;
    obj: () => validators.ObjectValidator;
    ArrayValidator: typeof validators.ArrayValidator;
    ObjectValidator: typeof validators.ObjectValidator;
    StringValidator: typeof validators.StringValidator;
    DateValidator: typeof validators.DateValidator;
    NumberValidator: typeof validators.NumberValidator;
    BooleanValidator: typeof validators.BooleanValidator;
};
export default _default;
