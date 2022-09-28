import { Context } from "../src"

describe("context is used as a validation context", () => {
  it("should store some values statically and return them on demand", () => {
    Context.bind("test", "abc")
    expect(Context.get("test")).toBe("abc")

    const testSymbol = Symbol("test")
    Context.bind(testSymbol, "abc")
    expect(Context.get(testSymbol)).toBe("abc")
  })

  it("should throw an error if identifier is not found", () => {
    expect(() => Context.get("test-error")).toThrow()
    expect(() => Context.get(Symbol("test-error"))).toThrow()
  })
})
