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
var BooleanValidator = /** @class */ (function (_super) {
    __extends(BooleanValidator, _super);
    function BooleanValidator(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, parent) || this;
        _this.type = "boolean";
        // attaching type validator
        _this.addValidator('boolean', rules_1.boolean.boolean(), {});
        return _this;
    }
    BooleanValidator.prototype.isTrue = function () {
        this.addValidator('true', rules_1.boolean.isTrue(), {});
        return this;
    };
    return BooleanValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = BooleanValidator;
