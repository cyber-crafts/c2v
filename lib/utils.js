"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elevatePaths = function (basePath, validationResult) {
    validationResult.errors.forEach(function (error) {
        error.dataPath = basePath + "/" + error.dataPath;
    });
    return validationResult;
};
exports.combineValidationResults = function () {
    var validationResults = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validationResults[_i] = arguments[_i];
    }
    var validationResult = { success: true, messages: [], errors: [] };
    validationResults.forEach(function (vr) {
        if (!vr.success)
            validationResult.success = false;
        validationResult.messages = validationResult.messages.concat(vr.messages);
        validationResult.errors = validationResult.errors.concat(vr.errors);
    });
    return validationResult;
};
