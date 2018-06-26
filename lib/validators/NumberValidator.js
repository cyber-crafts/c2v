"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatorBase_1 = require("../ValidatorBase");
var rules_1 = require("../rules");
var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator(integer, parent) {
        if (integer === void 0) { integer = false; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, parent) || this;
        // attaching type validator
        _this.addValidator('number', rules_1.number.number(), {});
        if (integer)
            _this.addValidator('integer', rules_1.number.integer(), {});
        return _this;
    }
    NumberValidator.prototype.min = function (min, exclusive) {
        if (exclusive === void 0) { exclusive = false; }
        this.addValidator('min', rules_1.number.min(min, exclusive), { min: min });
        return this;
    };
    NumberValidator.prototype.max = function (max, exclusive) {
        if (exclusive === void 0) { exclusive = false; }
        this.addValidator('max', rules_1.number.max(max, exclusive), { max: max });
        return this;
    };
    NumberValidator.prototype.multipleOf = function (modulus) {
        this.addValidator('multipleOf', rules_1.number.multipleOf(modulus), { modulus: modulus });
        return this;
    };
    Object.defineProperty(NumberValidator.prototype, "type", {
        get: function () {
            return "number";
        },
        enumerable: true,
        configurable: true
    });
    return NumberValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = NumberValidator;
