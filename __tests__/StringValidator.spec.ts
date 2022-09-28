import c2v, { validators, Context} from "../src"
const {ObjectValidator, StringValidator} = validators

let sv = new StringValidator()
beforeEach(() => {
  sv = new StringValidator()
})

describe("StringValidator is used to validate strings", () => {
  it("should succeed on length rule with valid value and fail otherwise", async () => {
    sv.length(3)
    expect(await Context.validate(sv, "test")).toHaveProperty("errors.0.rule", "string.length")
  })

  it("should succeed on minLength rule with valid value and fail otherwise", async () => {
    sv.minLength(3)
    expect(await Context.validate(sv, "test")).toHaveProperty("success", true)
    expect(await Context.validate(sv, "ts")).toHaveProperty("errors.0.rule", "string.minLength")
  })

  it("should succeed on maxLength rule with valid value and fail otherwise", async () => {
    sv.maxLength(5)
    expect(await Context.validate(sv, "test")).toHaveProperty("success", true)
    expect(await Context.validate(sv, "tessst")).toHaveProperty("errors.0.rule", "string.maxLength")
  })

  it("should succeed on values that matches and fail otherwise", async () => {
    sv.matches(/[abc]/)
    expect(await Context.validate(sv, "abc")).toHaveProperty("success", true)
    expect(await Context.validate(sv, "test")).toHaveProperty("errors.0.rule", "string.matches")
  })

  it("should succeed on values that are valid as url and fail otherwise", async () => {
    sv.url()
    expect(await Context.validate(sv, "http://test.com")).toHaveProperty("success", true)
    expect(await Context.validate(sv, "test")).toHaveProperty("errors.0.rule", "string.url")
  })

  it("should succeed on values that are valid as email address and fail otherwise", async () => {
    sv.email()
    expect(await Context.validate(sv, "test@domain.com")).toHaveProperty("success", true)
    expect(await Context.validate(sv, "test")).toHaveProperty("errors.0.rule", "string.email")
  })

  it("should succeed on values that are confirmed and fail otherwise", async () => {
    const objValidator = new ObjectValidator()
    objValidator.keys({
      "test": c2v.str.confirmed(),
    })

    expect(await Context.validate(objValidator, {
      "test": "abc",
      "test_confirmation": "abc",
    })).toHaveProperty("success", true)

    expect(await Context.validate(objValidator, {
      "test": "abc",
      "test_confirmation": "abcd",
    })).toHaveProperty("errors.0.rule", "string.confirmed")

    expect(await Context.validate(objValidator, {
      "test": "abc",
      "test_confirm": "abc",
    })).toHaveProperty("errors.0.rule", "string.confirmed")
  })
})
