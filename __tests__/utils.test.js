const { sanitizePath } = require("../lib/utils")

describe("utility functions test", () => {
  it('should sanitize strings starting with $', function () {
    expect(sanitizePath("$/test")).toBe("/test")
    expect(sanitizePath("$test")).toBe("/test")
    expect(sanitizePath("test")).toBe("/test")
    expect(sanitizePath("te/st")).toBe("/te/st")
  })
})