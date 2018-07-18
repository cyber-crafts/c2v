c2v is async and expressive validation library for nodejs apps
# Install
using yarn `yarn add c2v` or using npm `npm install c2v`
# Usage
Typescript or ES6

`import c2v from "c2v"`

or using ES5

`const c2v = require('c2v')`

## Basic example
for a basic employee model that has a first name, last name, email and birthdate
```javascript
import c2v, { Context } from "c2v"

const schema = c2v.obj.keys({
    // must be a string with minimum length of 2 letters and maximum length of 32
    firstName: c2v.str.minLength(2).maxLength(32),
    lastName: c2v.str.minLength(8).maxLength(64),
    // email address
    email: c2v.str.email(),
    // validates a date in a form of unix seconds
    birthdate: c2v.date.format(DF.Unix),
})

const result = await Context.validate(schema, {
    firstName: 'cyber',
    lastName: 'crafts',
    email: 'contact@cyber-crafts.com',
});

// >> result will be
{
    success: false,
    errors: [{
        dataPath: "/lastName",      // << where the error happened
        rule: "string.minLength",   // << what rule did it break
        params: { limit: 8 }        // << the rule configuration was used while validation
    }],
    messages: []
}
```
## validators
// todo: add description to what validators are and conclude on base validator

## object validator
### `requires`
In the example above the library will validate only existing fields against their validators, that's why the only error is on lastName property

The `requires` rule will cause a validation error if any of its arguments is missing from the object
```javascript
c2v.obj.requires('firstName', 'lastName', 'email', 'birthdate').keys({
  firstName: c2v.str.minLength(2).maxLength(32),
  lastName: c2v.str.minLength(8).maxLength(64),
  email: c2v.str.email(),
  birthdate: c2v.date.format(DF.Unix),
})
```
umm looks good, but not very real world scenario yet, what if we want to require a fields conditionally.

### `requiresWithAny`
require the existence of **conditional fields** if any of the **assertion fields** exist

so let's assume that if this employee has children then the number of children is required
```javascript
c2v.obj.requires('firstName', 'lastName', 'email', 'birthdate')
    .requiresWithAny(["numOfChildren"],["hasChildren"]) // requires numOfChildren if hasChildren is present on object
    // .requiresWithAny("numOfChildren","hasChildren")  << this is also valid
    .keys({
      firstName: c2v.str.minLength(2).maxLength(32),
      lastName: c2v.str.minLength(8).maxLength(64),
      email: c2v.str.email(),
      birthdate: c2v.date.format(DF.Unix),
      hasChildren: c2v.bool,
      numOfChildren: c2v.int
    })
```

### `requiresWithAll`
same as previous rule but the difference is that `requiresWithAll` will require **conditional fields** only if
all **assertion fields** are present on object while `requiresWithAny` will require them if any of the **assertion fields**
is present on the object.

### `requiresIfAny`
this is a more advanced use case this will require centain properties on current object if a condition is satisfied, so for the sake of example let's assume that we need the national Id of the employee if he is older than 45 years

```javascript
c2v.obj.requires('firstName', 'lastName', 'email', 'birthdate')
    .requiresIfAny(['nationalId'], {
      path: '/birthdate',   // assertion property path (json-pointer)
      validator: c2v.date.format(DF.Unix).furtherThanFromNow(-45, "years") // assertion rule
    }).keys({
      firstName: c2v.str.minLength(2).maxLength(32),
      lastName: c2v.str.minLength(8).maxLength(64),
      email: c2v.str.email(),
      birthdate: c2v.date.format(DF.Unix),
      nationalId: c2v.str.length(26),
    })
```

## array validator
array validator can assert array properties like the number of items in the array,
but it also can validate a certain entries
```javascript
c2v.arr.minItems(2).maxItems(3)
```
### `minItems`
asserts the array to be at least of certain length
### `maxItems`
asserts the array to be at most of certain length

### `allItems`
asserts that all array items meet a certain schema

in this example all array items must be valid email addresses
```javascript
c2v.arr.allItems(c2v.string.email())
```

### `items`
asserts certain items each against a certain schema, let's say that we are validating a GPS location coordinates
```javascript
c2v.arr.minItems(2).maxItems(2)        // restricting the array to only 2 entries
    .items({
        0: c2v.num.min(-180).max(180),   // validating first entry as longtude
        1: c2v.num.min(-90).max(90),     // validating second entry as latitude
    })
```

## String validator
### `length`
asserts if the field under validation is of certain length
```javascript
const schema = c2v.str.length(3);
```
### `minLength` and `maxLength`
asserts if the field under validation is of at least of certain length and at most of certain length respectively
```javascript
const schema = c2v.str.minLength(2).maxLength(32);
```
### `matches`
asserts if the field under validation matches a certain regular expression
### `url`
asserts if the field under validation is a valid url
### `email`
asserts if the field under validation is a valid email address
### `confirmed`
asserts if the field under validation exists with the name `<field>_confirmation` and its value is equal to the original `<field>`'s value

*this validation rule might me removed in the future*


//// documentation is on progress
