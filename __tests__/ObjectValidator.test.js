const { Context } = require("../lib");

const { validators } = require("../lib");
const { ObjectValidator } = validators;

let ov = new ObjectValidator();
beforeEach(() => {
  ov = new ObjectValidator();
});

describe("object validator", () => {
  it("should return errors on required but not supplied props", async () => {
    ov.requires("t", "s");
    const result = await Context.validate(ov, { t: 0 });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "");
    expect(result).toHaveProperty("errors.0.params.property", "s");
  });

  it("should validate required props on nested objects", async () => {
    ov.object("prop1").requires("t", "s");
    const result = await Context.validate(ov, { prop1: { t: 0 } });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "object.requires");
  });

  it("should validate array on objects", async () => {
    ov.array("prop1").maxItems(2);
    const result = await Context.validate(ov, { prop1: [1, 2, 3] });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "array.maxItems");
  });

  it("should return success validation if all props exists for requireWithAny", async () => {
    ov.requiresWithAny(["cond1", "cond2"], ["/assert1", "/assert2"]);
    const r = await Context.validate(ov, { "assert1": "dummy" });
    expect(r).toHaveProperty("errors.0.rule", "object.requiresWithAny");
  });

  it("should return success validation if all props exists for requireIfAny", async () => {
    const validationRule = (value, obj, path, context) => {
      if (value !== "dummies")
        context.addError("test.dummy", path);
      return Promise.resolve();
    };

    ov.requiresIfAny(["cond1", "cond2"], {
      path: "/assert1",
      validate: validationRule,
    });

    let r = await Context.validate(ov, { "conditional1": "dummy", "assert1": "dummies" });
    expect(r).toHaveProperty("errors.0.rule", "object.requiresIfAny");

    r = await Context.validate(ov, { "conditional1": "dummy", "assert1": "dummiessss" });
    expect(r).toHaveProperty("success", true);
  });


});
