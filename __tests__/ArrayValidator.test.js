const c2v = require("../lib").default;
const { ArrayValidator } = require("../lib").validators;
const { Context } = require("../lib");

let av;
beforeEach(() => {
  av = new ArrayValidator();
});

describe("array validator", () => {
  it("should have the right type name on its instances", () => {
    expect(av).toHaveProperty("type", "array");
  });

  it("should return errors if number of entries is more than maxItems property", async () => {
    av.maxItems(1);
    const result = await Context.validate(av, [1, 2]);
    expect(result).toHaveProperty("errors.0.rule", "array.maxItems");
    expect(result).toHaveProperty("errors.0.params.limit", 1);
  });

  it("should return errors if number of entries is less than minItems property", async () => {
    av.minItems(2);

    const result = await Context.validate(av, [1]);
    expect(result).toHaveProperty("errors.0.rule", "array.minItems");
    expect(result).toHaveProperty("errors.0.params.limit", 2);
  });

  it("should return errors if any entry breaks the allItem rule", async () => {
    av.allItems(c2v.int);
    const result = await Context.validate(av, [1.1]);
    expect(result).toHaveProperty("errors.0.rule", "number.integer");
    expect(result).toHaveProperty("errors.0.dataPath", "/0");
  });

  it("should return errors if any entry breaks the its singleValidator rule", async () => {
    av.nth(0).string().minLength(5);
    const result = await Context.validate(av, ["abc"]);
    expect(result).toHaveProperty("errors.0.rule", "string.minLength");
    expect(result).toHaveProperty("errors.0.dataPath", "/0");
  });
});
