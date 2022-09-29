"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge = require("lodash.merge");
var Context = /** @class */ (function () {
    function Context() {
        this._state = { success: true, messages: [], errors: [] };
        this._data = {};
    }
    Context.prototype.setData = function (data) {
        this._data = merge(data, this.getData());
        return this;
    };
    Context.prototype.getData = function () {
        return this._data;
    };
    Context.bind = function (name, value) {
        this._container[name] = value;
    };
    Context.get = function (name) {
        if (name in this._container)
            throw new Error("identifier ".concat(name.toString(), " is NOT found in context"));
        return this._container[name];
    };
    Object.defineProperty(Context.prototype, "isValid", {
        get: function () {
            return this._state.success;
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.invalidate = function () {
        this._state.success = false;
    };
    Context.prototype.addError = function (rule, dataPath, params) {
        if (params === void 0) { params = {}; }
        this._state.errors.push({ rule: rule, dataPath: dataPath, params: params });
        this.invalidate();
    };
    Context.prototype.addMessage = function (code, params) {
        if (params === void 0) { params = {}; }
        this._state.messages.push({ code: code, params: params });
    };
    Context.prototype.absorb = function (context) {
        this._state.errors = this.errors.concat(context.errors);
        this._state.messages = this.messages.concat(context.messages);
        if (this.errors.length > 0)
            this.invalidate();
    };
    Object.defineProperty(Context.prototype, "errors", {
        get: function () {
            return this._state.errors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "messages", {
        get: function () {
            return this._state.messages;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.validate = function (schema, obj, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData(data);
                        return [4 /*yield*/, Promise.all(schema.validate(obj, this))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.state];
                }
            });
        });
    };
    Context.validate = function (schema, obj, data) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = new Context();
                        return [4 /*yield*/, c.validate(schema, obj, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Context._container = {};
    return Context;
}());
exports.default = Context;
