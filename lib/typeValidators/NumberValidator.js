"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseTypeValidator_1 = require("../BaseTypeValidator");
const rules_1 = require("../rules");
class NumberValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor(integer = false, parent = null) {
        super(parent);
        // attaching type validator
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.number.number()(value))
                context.addError('number.number', path, {});
            if (integer && !rules_1.number.integer()(value))
                context.addError('number.integer', path, {});
        }));
    }
    get type() {
        return "number";
    }
    min(min, exclusive = false) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.number.min(min, exclusive)(value))
                context.addError('number.min', path, { exclusive });
        }));
        return this;
    }
    max(max, exclusive = false) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.number.max(max, exclusive)(value))
                context.addError('number.max', path, { exclusive });
        }));
        return this;
    }
    multipleOf(modulus) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.number.multipleOf(modulus)(value))
                context.addError('number.multipleOf', path, { modulus });
        }));
        return this;
    }
}
exports.default = NumberValidator;
