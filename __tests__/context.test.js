const { Context } = require("../lib");

describe("context is used as a validation context", () => {
  it("should store some values statically and return them on demand", () => {
    Context.bind("test", "abc");
    expect(Context.get("test")).toBe("abc");
  });
});
