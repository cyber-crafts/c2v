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
const json_pointer_1 = require("json-pointer");
const lodash_1 = require("lodash");
class BaseTypeValidator {
    constructor(parent = null) {
        this.validationRules = [];
        this.parent = parent;
    }
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    attach(validator) {
        this.addValidator(validator);
        return this;
    }
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    addValidator(validator) {
        this.validationRules.push(validator);
    }
    in(...items) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!items.find((item) => lodash_1.isEqual(value, item))) {
                context.addError(this.type + '.in', path, { items });
            }
        }));
        return this;
    }
    on(path) {
        this.addValidator((value, obj, dataPath, context) => __awaiter(this, void 0, void 0, function* () {
            if (json_pointer_1.has(obj, path)) {
                const container = json_pointer_1.get(obj, path);
                if (!Array.isArray(container) || !container.find(conValue => lodash_1.isEqual(value, conValue))) {
                    context.addError(this.type + '.on', dataPath, { path });
                }
            }
            else {
                context.addError(this.type + '.on', dataPath, { path });
            }
        }));
        return this;
    }
    /**
     * validates the target property and run it through all its validators if it exists
     * @param obj {object} the whole object under validation
     * @param path {string = ""} the path to the property under validation
     * @param context
     * @returns IValidationResult
     * */
    validate(obj, context, path = "") {
        const validatorPromises = [];
        // if the object under validation does not exist return default result
        if (!json_pointer_1.has(obj, path))
            return validatorPromises;
        const targetValue = json_pointer_1.get(obj, path);
        // loops over validators and build the validation result
        this.validationRules.forEach(validationRule => {
            validatorPromises.push(validationRule(targetValue, obj, path, context));
        });
        return validatorPromises;
    }
    // returns parent object
    get _() {
        return this.parent;
    }
}
exports.BaseTypeValidator = BaseTypeValidator;
