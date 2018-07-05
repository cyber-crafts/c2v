const { BooleanValidator } = require("../lib").validators;
const { Context } = require("../lib");

describe("BooleanValidator is a validator to validate boolean values", () => {
  it("should return a fail result if provided value is not a boolean", async () => {
    const bv = new BooleanValidator();
    const result = await Context.validate(bv, "test");
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.rule", "boolean.boolean");

    const result2 = await Context.validate(bv, false);
    expect(result2).toHaveProperty("success", true);
  });
});
