"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
exports.urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
exports.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.default = {
    length: function (limit) { return function (value) { return value.length === limit; }; },
    minLength: function (limit) { return function (value) { return value.length >= limit; }; },
    maxLength: function (limit) { return function (value) { return value.length <= limit; }; },
    matches: function (pattern) { return function (value) { return pattern.test(value); }; },
    url: function () { return function (value) { return exports.urlPattern.test(value); }; },
    email: function () { return function (value) { return exports.emailPattern.test(value); }; },
    // todo: add string.uuid
    // todo: add string.alphanumeric
    // todo: add string.alpha
    // todo: add string.numeric
    // todo: add string.alphanumeric dash
    confirmed: function () { return function (value, obj, path) {
        var confirmPath = path + "_confirmation";
        return (json_pointer_1.has(obj, path) && json_pointer_1.has(obj, confirmPath) && json_pointer_1.get(obj, path) === json_pointer_1.get(obj, confirmPath));
    }; }
};
