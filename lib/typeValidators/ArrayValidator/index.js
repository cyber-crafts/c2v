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
const BaseTypeValidator_1 = require("../../BaseTypeValidator");
const AllItemsValidator_1 = require("./AllItemsValidator");
const json_pointer_1 = require("json-pointer");
const SingleItemValidator_1 = require("./SingleItemValidator");
class ArrayValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor(path = "") {
        super();
        this.singleItemValidators = [];
        this.allItemsValidator = new AllItemsValidator_1.default();
    }
    minItems(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (value.length < limit)
                context.addError('array.minItems', path, { limit });
        }));
        return this;
    }
    maxItems(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (value.length > limit)
                context.addError('array.maxItems', path, { limit });
        }));
        return this;
    }
    allItems(validator = null) {
        if (validator)
            this.allItemsValidator.setTypeValidator(validator);
        return this;
    }
    items(validators) {
        Object.keys(validators).forEach(key => {
            if (!isNaN(Number(key))) {
                const siv = new SingleItemValidator_1.default(Number(key));
                this.singleItemValidators.push(siv);
                siv.setValidator(validators[key]);
            }
            else if (key === "*") {
                this.allItemsValidator.setTypeValidator(validators[key]);
            }
        });
        return this;
    }
    get type() {
        return "array";
    }
    validate(value, context, path = "") {
        let results = super.validate(value, context, path);
        if (json_pointer_1.has(value, path)) {
            // validating each entry
            results = results.concat(this.allItemsValidator.validate(value, context, path));
        }
        this.singleItemValidators.forEach(validator => {
            results = results.concat(validator.validate(value, path, context));
        });
        return results;
    }
}
exports.default = ArrayValidator;
