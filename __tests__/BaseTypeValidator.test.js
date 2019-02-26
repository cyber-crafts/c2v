const {BaseTypeValidator} = require('../lib/BaseTypeValidator')

describe('BaseTypeValidator provides base functionality for type validators', () => {

  it('should check if a validation rule exists', function () {
    const x = new BaseTypeValidator()
    x.in('a', 'b')
    expect(x.hasRule('in')).toBe(true)
    expect(x.hasRule('on')).toBe(false)
  })

  it('should remove validation rules attached to it', () => {
    const x = new BaseTypeValidator()
    x.in('a', 'b')
    expect(x.validationRules).toHaveProperty('in')
    x.removeRule('in')
    expect(x.validationRules).not.toHaveProperty('in')
  })
})
