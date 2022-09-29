import { Context } from "../src"

describe("context is used as a validation context", () => {
  it("should throw an error if identifier is not found", () => {
    expect(() => Context.get("test-error")).toThrow()
  })
})
