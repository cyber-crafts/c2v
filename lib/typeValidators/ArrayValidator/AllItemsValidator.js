"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
class AllItemsValidator {
    setTypeValidator(validator) {
        this.typeValidator = validator;
        return validator;
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
