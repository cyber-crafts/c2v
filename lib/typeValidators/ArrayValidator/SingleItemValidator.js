"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var SingleItemValidator = /** @class */ (function () {
    function SingleItemValidator(index) {
        this.index = index;
    }
    SingleItemValidator.prototype.setValidator = function (validator) {
        this.typeValidator = validator;
    };
    SingleItemValidator.prototype.validate = function (value, path, context) {
        var results = [];
        var dataPath = path + "/" + this.index;
        if (!json_pointer_1.has(value, path) || !json_pointer_1.has(value, dataPath))
            return results;
        results = results.concat(this.typeValidator.validate(value, context, dataPath));
        return results;
    };
    return SingleItemValidator;
}());
exports.default = SingleItemValidator;
