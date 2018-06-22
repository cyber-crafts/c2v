const { ObjectValidator } = require("../lib/validators");

let ov = new ObjectValidator();
beforeEach(() => {
  ov = new ObjectValidator();
});

describe("object validator", () => {
  it("should return errors on required but not supplied props", () => {
    const result = ov.requires("t", "s").validate({ t: 0 });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "");
    expect(result).toHaveProperty("errors.0.params.property", "s");
  });

  it("should validate required props on nested objects", () => {
    ov.object("prop1").requires("t", "s");
    const result = ov.validate({ prop1: { t: 0 } });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "object.requires");
  });

  it("should validate array on objects", () => {
    ov.array("prop1").maxItems(2);
    const result = ov.validate({ prop1: [1, 2, 3] });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "array.maxItems");
  });

  it("should return success validation if all props exists for requireWithAny", () => {
    ov.requiresWithAny(["cond1", "cond2"], ["/assert1", "/assert2"]);
    const r = ov.validate({ "assert1": "dummy" });
    expect(r).toHaveProperty("errors.0.rule", "object.requiresWithAny");
  });
});
