const { default: c2v, Context } = require("../lib");
const { DF } = require("../lib/intefaces");

const { validators } = require("../lib");
const { ObjectValidator, StringValidator } = validators;
const moment = require("moment");

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

    const asserter = new StringValidator().in("dummies");

    ov.requiresIfAny(["cond1", "cond2"], {
      path: "/assert1",
      validator: asserter,
    });

    let r = await Context.validate(ov, { "conditional1": "dummy", "assert1": "dummies" });
    expect(r).toHaveProperty("errors.0.rule", "object.requiresIfAny");

    r = await Context.validate(ov, { "conditional1": "dummy", "assert1": "dummiessss" });
    expect(r).toHaveProperty("success", true);
  });

  it("should validate requiresIfAny a nested property", async () => {
    const schema = c2v.obj.requires("birthdate")
      .requiresIfAny("nationalId", {
        path: "/birthdate",
        validator: c2v.date.format(DF.Unix).furtherThanFromNow(-16, "years"),
      }).keys({
        birthdate: c2v.date.format(DF.Unix),
        nationalId: c2v.str.length(14),
      });

    const result = await Context.validate(schema, {
      birthdate: moment().subtract(16, "years").unix(),
    });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.rule", 'object.requiresIfAny');
    expect(result).toHaveProperty("errors.0.params.conditionalProperty", 'nationalId');
  });

});
