const {default: c2v, Context} = require('../lib')
const {DF} = require('../lib/contracts')

const {validators} = require('../lib')
const {ObjectValidator, StringValidator} = validators
const moment = require('moment')


describe('object validator', () => {
  it('should return errors on required but not supplied props', async () => {
    const ov = new ObjectValidator()
    ov.requires('t', 's')
    const result = await Context.validate(ov, {t: 0})
    expect(result).toHaveProperty('success', false)
    expect(result).toHaveProperty('errors.0.dataPath', '')
    expect(result).toHaveProperty('errors.0.params.property', 's')
  })

  it('should validate required props on nested objects', async () => {
    const ov = new ObjectValidator()
    ov.keys({
      'prop1': c2v.obj.requires('t', 's'),
    })
    const result = await Context.validate(ov, {prop1: {t: 0}})
    expect(result).toHaveProperty('success', false)
    expect(result).toHaveProperty('errors.0.dataPath', '/prop1')
    expect(result).toHaveProperty('errors.0.rule', 'object.requires')
  })

  it('should validate array on objects', async () => {
    const ov = new ObjectValidator()
    ov.keys({
      'prop1': c2v.arr.maxItems(2),
    })
    const result = await Context.validate(ov, {prop1: [1, 2, 3]})
    expect(result).toHaveProperty('success', false)
    expect(result).toHaveProperty('errors.0.dataPath', '/prop1')
    expect(result).toHaveProperty('errors.0.rule', 'array.maxItems')
  })

  it('should detect the existence of keys', () => {
    const ov = new ObjectValidator()
    ov.keys({'prop1': c2v.str})

    expect(ov.hasKey('prop1')).toBe(true)
    expect(ov.hasKey('prop2')).toBe(false)
  })

  it('should enable removing keys', async () => {
    const ov = new ObjectValidator()
    ov.keys({
      'prop1': c2v.arr.maxItems(2),
    })

    ov.dropKey('prop1')
    expect(ov.hasKey('prop1')).toBe(false)

  })

  it('should return success validation if all props exists for requireWithAny', async () => {
    const ov = new ObjectValidator()
    ov.requiresWithAny(['cond1', 'cond2'], ['/assert1', '/assert2'])
    const r = await Context.validate(ov, {'assert1': 'dummy'})
    expect(r).toHaveProperty('errors.0.rule', 'object.requiresWithAny')
  })

  it('should return success validation if all props exists for requireWithAll and fail otherwise', async () => {
    const ov = new ObjectValidator()
    ov.requiresWithAll(['cond1', 'cond2'], ['/assert1', '/assert2'])
    let r = await Context.validate(ov, {'assert1': 'dummy'})
    expect(r).toHaveProperty('success', true)

    r = await Context.validate(ov, {'assert1': 'dummy', 'assert2': 'yummy'})
    expect(r).toHaveProperty('success', false)
  })

  it('should return success validation if all props exists for requireIfAny', async () => {
    const ov = new ObjectValidator()
    ov.requiresIfAny(['cond1', 'cond2'], {
      path: '/assert1',
      validator: new StringValidator().in('dummies'),
    })

    let r = await Context.validate(ov, {'conditional1': 'dummy', 'assert1': 'dummies'})
    expect(r).toHaveProperty('errors.0.rule', 'object.requiresIfAny')

    r = await Context.validate(ov, {'conditional1': 'dummy', 'assert1': 'dummiessss'})
    expect(r).toHaveProperty('success', true)
  })

  it('should return success validation if all props exists for requireIfAny with data as target test', async () => {
    const ov = new ObjectValidator()
    ov.requiresIfAny(['cond1', 'cond2'], {
      path: '$/t/assert1',
      validator: new StringValidator().in('dummies'),
    })

    let r = await Context.validate(ov, {'conditional1': 'dummy'}, {t: {'assert1': 'dummies'}})
    expect(r).toHaveProperty('errors.0.rule', 'object.requiresIfAny')
    r = await Context.validate(ov, {'conditional1': 'dummy', 'assert1': 'dummiessss'})
    expect(r).toHaveProperty('success', true)
  })

  it('should validate requiresIfAny a nested property', async () => {
    const schema = c2v.obj.requires('birthdate')
      .requiresIfAny('nationalId', {
        path: '/birthdate',
        validator: c2v.date.format(DF.Unix).furtherThanFromNow(-16, 'years'),
      }).keys({
        birthdate: c2v.date.format(DF.Unix),
        nationalId: c2v.str.length(14),
      })

    const result = await Context.validate(schema, {
      birthdate: moment().subtract(16, 'years').unix(),
    })
    expect(result).toHaveProperty('success', false)
    expect(result).toHaveProperty('errors.0.rule', 'object.requiresIfAny')
    expect(result).toHaveProperty('errors.0.params.conditionalProperty', 'nationalId')
  })

})
