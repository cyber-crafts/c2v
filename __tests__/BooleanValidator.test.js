const { BooleanValidator } = require("../lib/validators");

describe("BooleanValidator is a validator to validate boolean values", () => {
  it("should return a fail result if provided value is not a boolean", () => {
    const bv = new BooleanValidator();
    const result = bv.validate("test");
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.rule", "boolean.boolean");

    const result2 = bv.validate(false);
    expect(result2).toHaveProperty("success", true);
  });
});
