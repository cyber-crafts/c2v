"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
const intefaces_1 = require("../../intefaces");
const StringValidator_1 = require("../StringValidator");
const NumberValidator_1 = require("../NumberValidator");
const BooleanValidator_1 = require("../BooleanValidator");
const index_1 = require("../index");
class AllItemsValidator {
    constructor(parent) {
        this.parent = parent;
    }
    setTypeValidator(validator) {
        this.typeValidator = validator;
        return validator;
    }
    string() {
        return this.setTypeValidator(new StringValidator_1.default(this.parent));
    }
    number(integer = false) {
        return this.setTypeValidator(new NumberValidator_1.default(integer, this.parent));
    }
    boolean() {
        return this.setTypeValidator(new BooleanValidator_1.default(this.parent));
    }
    date(format = intefaces_1.DF.ISO8601) {
        return this.setTypeValidator(new index_1.DateValidator(format, this.parent));
    }
    validate(value, context, path) {
        let result = [];
        if (!json_pointer_1.has(value, path))
            return result;
        const array = json_pointer_1.get(value, path);
        if (this.typeValidator) {
            array.forEach((item, index) => {
                result = result.concat(this.typeValidator.validate(value, context, `${path}/${index}`));
            });
        }
        return result;
    }
}
exports.default = AllItemsValidator;
