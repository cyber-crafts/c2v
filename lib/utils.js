"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePath = void 0;
var sanitizePath = function (path) {
    path = (path.substr(0, 1) === "$") ? path.substr(1) : path;
    return (path.substr(0, 1) === "/") ? path : "/" + path;
};
exports.sanitizePath = sanitizePath;
