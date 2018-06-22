const {
  elevatePaths,
  combineValidationResults,
} = require("../lib/utils");

const arbitraryValidationResult = {
  success: false,
  messages: [],
  errors: [
    { rule: "testRule", dataPath: "test/data/path", params: {} },
    { rule: "testRule", dataPath: "test/data/path2", params: {} },
  ],
};

describe("utils is a module containing different util function for validation", () => {
  it("should elevate validationResult.errors.dataPath correctly", () => {
    const elevated = elevatePaths("base", arbitraryValidationResult);
    expect(elevated).toHaveProperty("errors.0.dataPath", "base/test/data/path");
    expect(elevated).toHaveProperty("errors.1.dataPath", "base/test/data/path2");
  });


  it("should correctly combine validation results", () => {
    const combined = combineValidationResults(
      arbitraryValidationResult,
      { success: true, messages: [{ code: "te.st", params: {} }], errors: [] },
    );
    expect(combined).toHaveProperty("errors.length", 2);
    expect(combined).toHaveProperty("messages.length", 1);
    expect(combined).toHaveProperty("success", false);
  });
});
