const { ObjectValidator, StringValidator } = require("../lib/validators");

describe("a full examples on how to use different validators", () => {

  it("should attach custom validators as needed", function () {
    const x = new StringValidator();
    x.attach({ name: "test", validate: () => false, params: {} });
    const r = x.validate("abc");
    expect(r).toHaveProperty("success", false);
    expect(r).toHaveProperty("errors.0.rule", "string.test");
  });

  it("should test", function () {
    const registerForm = new ObjectValidator();

    registerForm
      .requires("username", "email", "gender", "password", "accepts")
      .string("username").minLength(5).maxLength(32).matches(/^[a-z]$/)
      ._.string("email").email()
      ._.string("gender").in(["male", "female"])
      ._.string("password").minLength(6).maxLength(32).confirmed()
      ._.number("age", true).min(16).max(60)
      ._.boolean("accepts").isTrue()
      ._.array("hobbies").minItems(2).maxItems(64)
      .allItems().string.in(["programming", "tennis", "reading", "gaming"])
      ._.nth(0).string.maxLength(3);


    const result = registerForm.validate({
      "username": "",
      "email": "",
      "gender": "",
      "password": "",
      age: 15,
      hobbies: ["wrong hobby 1", "wrong hobby 2"],
    });

    // console.log(JSON.stringify(result));
  });
});
