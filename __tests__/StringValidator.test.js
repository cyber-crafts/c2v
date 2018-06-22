const { StringValidator, ObjectValidator }  = require("../lib/validators");

let sv;
beforeEach(() => {
  sv = new StringValidator();
});

describe("StringValidator is used to validate strings", () => {
  it("should succeed on length rule with valid value and fail otherwise", () => {
    sv.length(3);
    expect(sv.validate("tst")).toHaveProperty("success", true);
    expect(sv.validate("ts")).toHaveProperty("errors.0.rule", "string.length");
  });

  it("should succeed on minLength rule with valid value and fail otherwise", () => {
    sv.minLength(3);
    expect(sv.validate("test")).toHaveProperty("success", true);
    expect(sv.validate("ts")).toHaveProperty("errors.0.rule", "string.minLength");
  });

  it("should succeed on maxLength rule with valid value and fail otherwise", () => {
    sv.maxLength(5);
    expect(sv.validate("test")).toHaveProperty("success", true);
    expect(sv.validate("tessst")).toHaveProperty("errors.0.rule", "string.maxLength");
  });

  it("should succeed on values that matches and fail otherwise", () => {
    sv.matches(/[abc]/);
    expect(sv.validate("abc")).toHaveProperty("success", true);
    expect(sv.validate("test")).toHaveProperty("errors.0.rule", "string.matches");
  });

  it("should succeed on values that are valid as url and fail otherwise", () => {
    sv.url();
    expect(sv.validate("http://test.com")).toHaveProperty("success", true);
    expect(sv.validate("test")).toHaveProperty("errors.0.rule", "string.url");
  });

  it("should succeed on values that are valid as email address and fail otherwise", () => {
    sv.email();
    expect(sv.validate("test@domain.com")).toHaveProperty("success", true);
    expect(sv.validate("test")).toHaveProperty("errors.0.rule", "string.email");
  });

  it("should succeed on values that are confirmed and fail otherwise", () => {
    const objValidator = new ObjectValidator();
    objValidator.string("test").confirmed();

    expect(objValidator.validate({ "test": "abc", "test_confirmation": "abc" })).toHaveProperty("success", true);
    expect(objValidator.validate({
      "test": "abc",
      "test_confirmation": "abcd",
    })).toHaveProperty("errors.0.rule", "string.confirmed");
    expect(objValidator.validate({
      "test": "abc",
      "test_confirm": "abc",
    })).toHaveProperty("errors.0.rule", "string.confirmed");
  });
});
