const { ArrayValidator } = require("../lib/validators");

describe("array validator", () => {
  it("should return errors if number of entries is more than maxItems property", () => {
    const av = new ArrayValidator();
    const result = av.maxItems(1).validate([1, 2]);
    expect(result).toHaveProperty("errors.0.rule", "array.maxItems");
    expect(result).toHaveProperty("errors.0.params.limit", 1);
  });

  it("should return errors if number of entries is less than minItems property", () => {
    const av = new ArrayValidator();
    const result = av.minItems(2).validate([1]);
    expect(result).toHaveProperty("errors.0.rule", "array.minItems");
    expect(result).toHaveProperty("errors.0.params.limit", 2);
  });

  it("should return errors if any entry breaks the allItem rule", () => {
    const av = new ArrayValidator();
    av.allItems().number(true);
    const result = av.validate([1.1]);
    expect(result).toHaveProperty("errors.0.rule", "number.integer");
    expect(result).toHaveProperty("errors.0.dataPath", "/0");
  });

  it("should return errors if any entry breaks the its singleValidator rule", () => {
    const av = new ArrayValidator();
    av.nth(0).string.minLength(5);
    const result = av.validate(["abc"]);
    expect(result).toHaveProperty("errors.0.rule", "string.minLength");
    expect(result).toHaveProperty("errors.0.dataPath", "/0");
  });
});
