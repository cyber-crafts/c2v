const { Context } = require("../lib");
const { StringValidator } = require("../lib/typeValidators");
const c2v = require("../lib").default;


describe("a full examples on how to use different validators", () => {

  it("should be able to attach rules", async () => {
    const x = new StringValidator().maxLength(3);
    const z = await Context.validate(x, "test");
    expect(z).toHaveProperty("errors.0.rule", "string.maxLength");
  });

  // it("should attach custom validators as needed", function () {
  //   const x = new StringValidator();
  //   x.attach({ name: "test", validate: () => false, params: {} });
  //   const r = x.validate("abc");
  //   expect(r).toHaveProperty("success", false);
  //   expect(r).toHaveProperty("errors.0.rule", "string.test");
  // });
  //
  it("should be able to validate nested objects", async () => {
    const schema = c2v.obj.requires("address").keys({
      address: c2v.str.minLength(3),
      location: c2v.obj.requires("type", "coordinates").keys({
        type: c2v.str.in("point"),
        coordinates: c2v.arr.minItems(2).maxItems(2).items({
          0: c2v.num.min(-180).max(180),
          1: c2v.num.min(-90).max(90),
        }),
      }),
    });


    let result = await Context.validate(schema, {
      address: "test",
      location: {
        type: "typo",
        coordinates: [181],
      },
    });

    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.rule", "string.in");
  });
});
