const {BaseTypeValidator} = require('../lib/BaseTypeValidator')

describe('BaseTypeValidator provides base functionality for type validators', () => {
  it('can retrieve the validation rules attached to it', () => {
    const x = new BaseTypeValidator()
    x.in('a', 'b')
    console.log(x.validationRules.in)
    expect(x.validationRules).toHaveProperty('in')
  })
})
