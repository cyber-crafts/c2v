"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
exports.urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
exports.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.default = {
    length: (limit) => (value) => value.length === limit,
    minLength: (limit) => (value) => value.length >= limit,
    maxLength: (limit) => (value) => value.length <= limit,
    matches: (pattern) => (value) => pattern.test(value),
    url: () => (value) => exports.urlPattern.test(value),
    email: () => (value) => exports.emailPattern.test(value),
    // todo: add string.uuid
    // todo: add string.alphanumeric
    // todo: add string.alpha
    // todo: add string.numeric
    // todo: add string.alphanumeric dash
    confirmed: () => (value, obj, path) => {
        const confirmPath = `${path}_confirmation`;
        return (json_pointer_1.has(obj, path) && json_pointer_1.has(obj, confirmPath) && json_pointer_1.get(obj, path) === json_pointer_1.get(obj, confirmPath));
    }
};
