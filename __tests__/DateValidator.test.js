const { DF } = require("../lib/intefaces");
const { DateValidator } = require("../lib/validators");
const moment = require("moment");

let dv = new DateValidator();
beforeEach(() => {
  dv = new DateValidator();
});

describe("DateValidator is used to validate dates and dates representations in strings or integers", () => {
  it("should succeed on before rule with valid value and fail otherwise", () => {
    dv.before("2018-06-01");
    expect(dv.validate("2018-06-02")).toHaveProperty("errors.0.rule", "date.before");
    expect(dv.validate("2018-05-31")).toHaveProperty("success", true);
  });

  it("should succeed on after rule with valid value and fail otherwise", () => {
    dv.after("2018-06-01");
    expect(dv.validate("2018-05-31")).toHaveProperty("errors.0.rule", "date.after");
    expect(dv.validate("2018-06-02")).toHaveProperty("success", true);
  });

  it("should succeed on closerThanFromNow rule with valid value and fail otherwise", () => {
    dv.closerThanFromNow(7, "days");
    const correctDate = moment().format(DF.ISO8601);
    const wrongDate = moment().add(21, "days").format(DF.ISO8601);

    expect(dv.validate(correctDate)).toHaveProperty("success", true);
    expect(dv.validate(wrongDate)).toHaveProperty("errors.0.rule", "date.closerThanFromNow");
  });

  it("should succeed on negative-limit closerThanFromNow rule with valid value and fail otherwise", () => {
    dv.closerThanFromNow(-7, "days");
    const correctDate = moment().add(1, "day").format(DF.ISO8601);
    const wrongDate = moment().subtract(21, "days").format(DF.ISO8601);

    expect(dv.validate(correctDate)).toHaveProperty("success", true);
    expect(dv.validate(wrongDate)).toHaveProperty("errors.0.rule", "date.closerThanFromNow");
  });

  it("should succeed on furtherThanFromNow rule with valid value and fail otherwise", () => {
    dv.furtherThanFromNow(7, "days");
    const correctDate = moment().add(8, "days").format(DF.ISO8601);
    const wrongDate = moment().format(DF.ISO8601);

    expect(dv.validate(correctDate)).toHaveProperty("success", true);
    expect(dv.validate(wrongDate)).toHaveProperty("errors.0.rule", "date.furtherThanFromNow");
  });


  it("should succeed on negative-limit furtherThanFromNow rule with valid value and fail otherwise", () => {
    dv.furtherThanFromNow(-7, "days");
    const correctDate = moment().subtract(8, "day").format(DF.ISO8601);
    const wrongDate = moment().subtract(6, "days").format(DF.ISO8601);

    expect(dv.validate(correctDate)).toHaveProperty("success", true);
    expect(dv.validate(wrongDate)).toHaveProperty("errors.0.rule", "date.furtherThanFromNow");
  });

});
