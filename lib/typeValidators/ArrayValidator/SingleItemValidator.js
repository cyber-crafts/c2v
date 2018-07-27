"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
class SingleItemValidator {
    constructor(index) {
        this.index = index;
    }
    setValidator(validator) {
        this.typeValidator = validator;
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
