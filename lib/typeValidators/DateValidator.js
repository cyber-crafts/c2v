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
const json_pointer_1 = require("json-pointer");
const contracts_1 = require("../contracts");
const moment = require("moment");
const rules_1 = require("../rules");
class DateValidator extends BaseTypeValidator_1.BaseTypeValidator {
    constructor(format = contracts_1.DF.ISO8601) {
        super();
        this.type = "date";
        this._format = format;
    }
    parse(date) {
        if (typeof date === "number" && this._format === contracts_1.DF.Unix)
            return moment.unix(date);
        return moment(date, this._format);
    }
    format(format) {
        this._format = format;
        return this;
    }
    before(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.date.before(this.parse(limit))(value))
                context.addError('date.before', path, { limit });
        }));
        return this;
    }
    after(limit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.date.after(this.parse(limit))(value))
                context.addError('date.after', path, { limit });
        }));
        return this;
    }
    closerThanFromNow(amount, unit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.date.closerThanFromNow(amount, unit)(value))
                context.addError('date.closerThanFromNow', path, { amount, unit });
        }));
        return this;
    }
    furtherThanFromNow(amount, unit) {
        this.addValidator((value, obj, path, context) => __awaiter(this, void 0, void 0, function* () {
            if (!rules_1.date.furtherThanFromNow(amount, unit)(value))
                context.addError('date.furtherThanFromNow', path, { amount, unit });
        }));
        return this;
    }
    validate(obj, context, path = "") {
        if (path !== "") {
            json_pointer_1.set(obj, path, this.parse(json_pointer_1.get(obj, path)));
            return super.validate(obj, context, path);
        }
        else {
            return super.validate(this.parse(obj), context, path);
        }
    }
}
exports.default = DateValidator;
