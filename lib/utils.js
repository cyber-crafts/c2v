"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = (value) => {
    return Promise.resolve(value);
};
exports.success = () => {
    return { success: true, errors: [], messages: [] };
};
exports.elevatePaths = (basePath, validationResult) => {
    validationResult.errors.forEach(error => {
        error.dataPath = `${basePath}/${error.dataPath}`;
    });
    return validationResult;
};
exports.combineValidationResults = (...validationResults) => {
    const validationResult = { success: true, messages: [], errors: [] };
    validationResults.forEach(vr => {
        if (!vr.success)
            validationResult.success = false;
        validationResult.messages = validationResult.messages.concat(vr.messages);
        validationResult.errors = validationResult.errors.concat(vr.errors);
    });
    return validationResult;
};
