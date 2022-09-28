import c2v, { BaseTypeValidator as Base, validators } from "../src" 
const { ObjectValidator } = validators

class BaseTypeValidator extends Base {
  public get type(): string {
    throw new Error("Method not implemented.")
  }
}

describe("BaseTypeValidator provides base functionality for type validators", () => {
  it("should check if a validation rule exists", function () {
    const x = new BaseTypeValidator()
    x.in("a", "b")
    expect(x.hasRule("in")).toBe(true)
    expect(x.hasRule("on")).toBe(false)
  })

  it("should remove validation rules attached to it", () => {
    const x = new BaseTypeValidator()
    x.in("a", "b")
    expect(x.validationRules).toHaveProperty("in")
    x.removeRule("in")
    expect(x.validationRules).not.toHaveProperty("in")
  })

  it("should clone a schema", () => {
    const schema = new ObjectValidator()
    schema.addKey("test1", c2v.str)
    expect(schema.hasKey("test1")).toBe(true)
    const cloned = schema.clone()
    cloned.addKey("test2", c2v.str)
    expect(schema.hasKey("test2")).toBe(false)
    expect(cloned.hasKey("test2")).toBe(true)

  })
})
