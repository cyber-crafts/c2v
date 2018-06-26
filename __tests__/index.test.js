const { ObjectValidator, StringValidator } = require("../lib/validators");
const c2v = require("../lib").default;

describe("a full examples on how to use different validators", () => {

  it("should attach custom validators as needed", function () {
    const x = new StringValidator();
    x.attach({ name: "test", validate: () => false, params: {} });
    const r = x.validate("abc");
    expect(r).toHaveProperty("success", false);
    expect(r).toHaveProperty("errors.0.rule", "string.test");
  });

  it("should test", function () {
    const address = c2v.obj().requires("address").keys({
      "address": c2v.str().minLength(128),
      "location": c2v.obj().requires("type", "coordinates").keys({
        "type": c2v.str().in("point"),
        "coordinates": c2v.arr().items({
          0: c2v.num().min(-180).max(180),
          1: c2v.num().min(-90).max(90),
        }),
      }),
    });

    let result = address.validate({
      address: "test",
    });

    console.log(JSON.stringify(result, null, 2));
  });
});
