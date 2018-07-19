c2v is async and expressive validation library for nodejs apps
# Install
using yarn `yarn add c2v` or using npm `npm i c2v`
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
validators or (type validators) are a set of classes used to validate a certain data type, all validators extend base class `BaseValidator` and by default all validators add a validation rule to check the data type on constructor

## validators shorthands
`ObjectValidator` class (shorthand `c2v.obj`): holds validation rules related to objects

`ArrayValidator` class (shorthand `c2v.arr`): holds validation rules related to arrays

`StringValidator` class (shorthand `c2v.str`): holds validation rules related to strings

`NumberValidator` class (shorthand `c2v.num`): holds validation rules related to numbers, also `c2v.int` is shorthand for `new NumberValidator(true)` which adds one more check to see if a given value in an integer

`DateValidator` class (shorthand `c2v.date`): holds validation rules related to dates

`BooleanValidator` class (shorthand `c2v.bool`): holds validation rules related to booleans

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
### `minItems` and `maxItems`
asserts the array to be at least or at most of certain length
```javascript
c2v.arr.minItems(2).maxItems(3)
```
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

## string validator
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
```javascript
const schema = c2v.str.matches(/[0-9]{5}/);
```
this will validate the string to contain only numbers and contain only 5 letters
### `url`
asserts if the field under validation is a valid url
```javascript
const schema = c2v.str.url();
```
### `email`
asserts if the field under validation is a valid email address
```javascript
const schema = c2v.str.email();
```

### `confirmed`
asserts if the field under validation exists with the name `<field>_confirmation` and its value is equal to the original `<field>`'s value

*this validation rule might me removed in the future*

## number validator
### `min` and `max`
asserts that the field under validation is more than or less than a certain value
```javascript
c2v.num.min(128).max(256) // 128 is valid and 256 is valid
```
both rules accept a second parameter `exclusive` if true then the validated value 
must not equal the `min` or the `max` limit to be valid
```javascript
c2v.num.min(128, true).max(256) // 128 is invalid
```

### `multipleOf`
asserts that the field under validation is a multiple of a given number
```javascript
c2v.num.multipleOf(3) // 3, 6, 9 etc are valid values
```
## date validator
### `format`
asserts that the field under validation is represented in a known format

*if not set this defaults to `DF.ISO8601` which is `YYYY-MM-DD`*
### `before` and `after`
asserts that the field under validation is before or after a centain date respectively 
```javascript
// validates if the value is a date after "2018-07-01" before "2018-08-01"
c2v.date.after("2018-07-01").before("2018-08-01");
```
### `closerThanFromNow`
asserts that the date under valiadtion is between `now` and the duration, if the duration has a negative value then the validator will assume you want to assert that the value is between `now` and the given duration in the past
```javascript
// any value between now and next 7 days
c2v.date.closerThanFromNow(7, "days")
// any value between now and past 7 days
c2v.date.closerThanFromNow(-7, "days")
```
### `furtherThanFromNow`
asserts that the date under valiadtion is further than the given duration, if the duration has a negative value then the validator will assume you want to assert that the value is further than the given duration in the past
```javascript
// any value after 7 days from now
c2v.date.furtherThanFromNow(7, "days")
// any value before 7 days from now
c2v.date.furtherThanFromNow(-7, "days")
```

// upcoming
# context
# extending validators