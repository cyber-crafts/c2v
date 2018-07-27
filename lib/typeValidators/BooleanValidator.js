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
class BooleanValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor() {
        super();
        this.type = "boolean";
        // attaching type validator
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.boolean.boolean()(value))
                context.addError('boolean.boolean', path, {});
        }));
    }
    isTrue() {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.boolean.isTrue()(value))
                context.addError('boolean.true', path, {});
        }));
        return this;
    }
}
exports.default = BooleanValidator;
