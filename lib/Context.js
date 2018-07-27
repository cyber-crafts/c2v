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
const lodash_1 = require("lodash");
class Context {
    constructor() {
        this._state = { success: true, messages: [], errors: [] };
        this._data = {};
    }
    setData(data) {
        this._data = lodash_1.merge(data, this.getData());
        return this;
    }
    getData() {
        return this._data;
    }
    static bind(name, value) {
        this._container[name] = value;
    }
    static get(name) {
        if (!this._container.hasOwnProperty(name))
            throw new Error(`identifier ${name.toString()} is NOT found in context`);
        return this._container[name];
    }
    get isValid() {
        return this._state.success;
    }
    invalidate() {
        this._state.success = false;
    }
    addError(rule, dataPath, params = {}) {
        this._state.errors.push({ rule, dataPath, params });
        this.invalidate();
    }
    addMessage(code, params = {}) {
        this._state.messages.push({ code, params });
    }
    absorb(context) {
        this._state.errors = this.errors.concat(context.errors);
        this._state.messages = this.messages.concat(context.messages);
        if (this.errors.length > 0)
            this.invalidate();
    }
    get errors() {
        return this._state.errors;
    }
    get messages() {
        return this._state.messages;
    }
    get state() {
        return this._state;
    }
    validate(schema, obj, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setData(data);
            yield Promise.all(schema.validate(obj, this));
            return this.state;
        });
    }
    static validate(schema, obj, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = new Context();
            return yield c.validate(schema, obj, data);
        });
    }
}
Context._container = {};
exports.default = Context;
