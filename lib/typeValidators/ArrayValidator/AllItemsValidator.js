"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var AllItemsValidator = /** @class */ (function () {
    function AllItemsValidator() {
    }
    AllItemsValidator.prototype.setTypeValidator = function (validator) {
        this.typeValidator = validator;
        return validator;
    };
    AllItemsValidator.prototype.validate = function (value, context, path) {
        var _this = this;
        var result = [];
        if (!json_pointer_1.has(value, path))
            return result;
        var array = json_pointer_1.get(value, path);
        if (this.typeValidator) {
            array.forEach(function (item, index) {
                result = result.concat(_this.typeValidator.validate(value, context, path + "/" + index));
            });
        }
        return result;
    };
    return AllItemsValidator;
}());
exports.default = AllItemsValidator;
