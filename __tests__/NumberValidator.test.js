const { default: c2v, Context } = require("../lib");

const { validators } = require("../lib");
const { NumberValidator } = validators;

let nv = new NumberValidator();
beforeEach(() => {
  nv = new NumberValidator();
});

describe("number validator is a type validator for numbers",() => {
    
    it("should return correct type of data", async () => {
        expect(nv.type).toBe("number");
    })

    it("should return error if value is not a number and succeed otherwise", async () => {
        const result = await Context.validate(nv,"abc")
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.number");
    })

    it("should return error if value is larger than max limit and succeed otherwise", async () => {
        nv.max(15);
        let result = await Context.validate(nv,16)
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.max");

        result = await Context.validate(nv,15);
        expect(result).toHaveProperty("success", true);
    })

    it("should return error if value is equal to max if set to exclusive limit and succeed otherwise", async () => {
        nv.max(15,true);
        let result = await Context.validate(nv,15)
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.max");

        result = await Context.validate(nv,14.9999);
        expect(result).toHaveProperty("success", true);
    })


    it("should return error if value is smaller than min limit and succeed otherwise", async () => {
        nv.min(15);
        let result = await Context.validate(nv,14)
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.min");

        result = await Context.validate(nv,15);
        expect(result).toHaveProperty("success", true);
    })

    it("should return error if value is equal to min if set to exclusive limit and succeed otherwise", async () => {
        nv.min(15,true);
        let result = await Context.validate(nv,15)
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.min");

        result = await Context.validate(nv,15.0001);
        expect(result).toHaveProperty("success", true);
    })

    it("should return error if value is not a multiple of given modulus and succeed otherwise", async () => {
        nv.multipleOf(3)
        const result = await Context.validate(nv,5)
        expect(result).toHaveProperty("success", false);
        expect(result).toHaveProperty("errors.0.rule", "number.multipleOf");
    })

})