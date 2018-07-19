"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
const StringValidator_1 = require("../StringValidator");
const NumberValidator_1 = require("../NumberValidator");
class SingleItemValidator {
    constructor(index, parent) {
        this.index = index;
        this.parent = parent;
    }
    setValidator(validator) {
        this.typeValidator = validator;
    }
    string() {
        const tv = new StringValidator_1.default(this.parent);
        this.typeValidator = tv;
        return tv;
    }
    number(integer = false) {
        const nv = new NumberValidator_1.default(integer, this.parent);
        this.typeValidator = nv;
        return nv;
    }
    validate(value, path, context) {
        let results = [];
        const dataPath = `${path}/${this.index}`;
        if (!json_pointer_1.has(value, path) || !json_pointer_1.has(value, dataPath))
            return results;
        results = results.concat(this.typeValidator.validate(value, context, dataPath));
        return results;
    }
}
exports.default = SingleItemValidator;
