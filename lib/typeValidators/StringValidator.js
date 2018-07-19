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
class StringValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor(parent = null) {
        super(parent);
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (typeof value !== "string")
                context.addError('string.string', path);
        }));
    }
    length(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.length(limit)(value))
                context.addError('string.length', path, { limit });
        }));
        return this;
    }
    minLength(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.minLength(limit)(value))
                context.addError('string.minLength', path, { limit });
        }));
        return this;
    }
    maxLength(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.maxLength(limit)(value))
                context.addError('string.maxLength', path, { limit });
        }));
        return this;
    }
    matches(pattern) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.matches(pattern)(value))
                context.addError('string.matches', path, { pattern: pattern.toString() });
        }));
        return this;
    }
    url() {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.url()(value))
                context.addError('string.url', path, {});
        }));
        return this;
    }
    email() {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.email()(value))
                context.addError('string.email', path, {});
        }));
        return this;
    }
    confirmed() {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.string.confirmed()(value, obj, path))
                context.addError('string.confirmed', path, {});
        }));
        return this;
    }
    get type() {
        return "string";
    }
}
exports.default = StringValidator;
