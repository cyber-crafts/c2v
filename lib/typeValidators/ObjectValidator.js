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
const _1 = require("./");
const intefaces_1 = require("../intefaces");
const json_pointer_1 = require("json-pointer");
const Context_1 = require("../Context");
const getPath = (name) => (name.charAt(0) === "/") ? name : "/" + name;
class ObjectValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor(parent = null) {
        super(parent);
        this.requiredProps = [];
        this.typeValidators = {};
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (typeof value !== "object")
                context.addError('object.object', path);
        }));
    }
    get type() {
        return "object";
    }
    requires(...properties) {
        this.requiredProps = this.requiredProps.concat(properties);
        return this;
    }
    requiresIfAny(conditionalProps, validationRules) {
        const conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        const validationWrappers = (Array.isArray(validationRules)) ? validationRules : [validationRules];
        conditionalProperties.forEach(conditionalProperty => {
            this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < validationWrappers.length; i++) {
                    const wrapper = validationWrappers[i];
                    if (json_pointer_1.has(obj, wrapper.path)) {
                        const _context = new Context_1.default();
                        yield Promise.all(wrapper.validator.validate(obj, _context, wrapper.path));
                        if (_context.isValid)
                            if (!json_pointer_1.has(value, `/${conditionalProperty}`)) {
                                context.addError('object.requiresIfAny', path, { conditionalProperty, assertionProperties: wrapper.path });
                            }
                    }
                }
            }));
        });
        return this;
    }
    requiresWithAny(conditionalProps, assertionPaths) {
        const conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        const assertionProperties = (Array.isArray(assertionPaths)) ? assertionPaths : [assertionPaths];
        conditionalProperties.forEach(conditionalProperty => {
            this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < assertionProperties.length; i++)
                    if (json_pointer_1.has(obj, assertionProperties[i]))
                        if (!value.hasOwnProperty(conditionalProperty))
                            context.addError('object.requiresWithAny', path, { conditionalProperty, assertionProperties });
            }));
        });
        return this;
    }
    requiresWithAll(conditionalProps, assertionProps) {
        const conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        const assertionProperties = (Array.isArray(assertionProps)) ? assertionProps : [assertionProps];
        conditionalProperties.forEach(conditionalProperty => {
            this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < assertionProperties.length; i++)
                    if (!json_pointer_1.has(obj, assertionProperties[i]))
                        return;
                if (value.hasOwnProperty(conditionalProperty))
                    context.addError('object.requiresWithAll', path, { conditionalProperty, assertionProperties });
            }));
        });
        return this;
    }
    addEntryValidator(name, validator) {
        const pointer = getPath(name);
        if (json_pointer_1.has(this.typeValidators, pointer))
            return json_pointer_1.get(this.typeValidators, pointer);
        json_pointer_1.set(this.typeValidators, pointer, validator);
        return validator;
    }
    keys(validators) {
        Object.keys(validators).forEach(key => this.addEntryValidator(key, validators[key]));
        return this;
    }
    array(name) {
        return this.addEntryValidator(name, new _1.ArrayValidator(getPath(name), this));
    }
    object(name) {
        return this.addEntryValidator(name, new ObjectValidator(this));
    }
    string(name) {
        return this.addEntryValidator(name, new _1.StringValidator(this));
    }
    date(name, format = intefaces_1.DF.ISO8601) {
        return this.addEntryValidator(name, new _1.DateValidator(format, this));
    }
    number(name, integer = false) {
        return this.addEntryValidator(name, new _1.NumberValidator(integer, this));
    }
    boolean(name) {
        return this.addEntryValidator(name, new _1.BooleanValidator(this));
    }
    // add validation rule requires
    validate(value, context, path = "") {
        let results = [];
        // checking required properties
        this.requiredProps.forEach(property => {
            if (!json_pointer_1.has(value, `${path}/${property}`) || json_pointer_1.get(value, `${path}/${property}`) === null) {
                context.addError("object.requires", path, { property });
            }
        });
        const superResult = super.validate(value, context, path);
        let propertiesResults = [];
        Object.keys(this.typeValidators).forEach(propertyName => {
            const typeValidator = this.typeValidators[propertyName];
            const propertyPath = [path, propertyName].join("/");
            if (json_pointer_1.has(value, propertyPath) && json_pointer_1.get(value, propertyPath) !== null) {
                propertiesResults = propertiesResults.concat(typeValidator.validate(value, context, propertyPath));
            }
        });
        return propertiesResults.concat(superResult.concat(results));
    }
}
exports.default = ObjectValidator;
