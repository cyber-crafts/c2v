"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTypeValidator = exports.contracts = exports.validators = exports.Context = void 0;
var typeValidators = __importStar(require("./typeValidators"));
var contracts = __importStar(require("./contracts"));
exports.contracts = contracts;
var Context_1 = require("./Context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return __importDefault(Context_1).default; } });
exports.validators = typeValidators;
var BaseTypeValidator_1 = require("./BaseTypeValidator");
Object.defineProperty(exports, "BaseTypeValidator", { enumerable: true, get: function () { return BaseTypeValidator_1.BaseTypeValidator; } });
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    Object.defineProperty(default_1, "str", {
        get: function () {
            return new exports.validators.StringValidator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "int", {
        get: function () {
            return new exports.validators.NumberValidator(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "num", {
        get: function () {
            return new exports.validators.NumberValidator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "date", {
        get: function () {
            return new exports.validators.DateValidator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "bool", {
        get: function () {
            return new exports.validators.BooleanValidator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "arr", {
        get: function () {
            return new exports.validators.ArrayValidator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(default_1, "obj", {
        get: function () {
            return new exports.validators.ObjectValidator();
        },
        enumerable: false,
        configurable: true
    });
    return default_1;
}());
exports.default = default_1;
