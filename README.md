### schemajs [![Build Status](https://secure.travis-ci.org/eleith/schemajs.png)](http://travis-ci.org/eleith/schemajs)

validate objects (including http request params) against a schema. includes express middleware.

### Installing 

	npm install schemajs

# FEATURES
 - validates schema for deep objects and arrays as well
 - schema is in JSON, making it portable
 - properties, types and filters are extensible

# EXAMPLE USAGE - validate an object

```javascript
var schema  = require("./path/to/schemajs");
var model   = schema.create(
{
  name:	   {type:"string", filters:"trim", properties:{max:255}, required:true},
  email:   {type:"email", filters:"trim", required:true},
  wins:    {type:"int", filters:["trim", "toInt"], default:0},
  average: {type:"float", filters:["trim", "toFloat"], default:0}
});

var form = model.validate({name:" your name ", email:" name@example.com "});

// form.valid  - boolean, true if object matches schema
// form.data   - contains filtered version of the object {name:"your name", email:"name@example.com", wins:0, average:0}
// form.errors - contains associative array of any errors found
```

# EXAMPLE USAGE - in expressjs, validate the request parameters
```javascript
var schema  = require("./path/to/schemajs");
var query   = schema.create(
{
  wins:    {type:"int", filters:"toInt"},
  query:   {type:"string", filters:"trim", required:true, error:"invalid query"}
});

app.get("/users", schema.middleware(query), function(req, res)
{
  // schema validation is attached to req.form
  if(req.form.valid)
  {
    db_lookup({query:req.form.data.query, wins: req.form.data.wins});
  }
  else
  {
    next(new Error("invalid request"));
    //next(req.form.errors, 400);
  }
});
```
# API 

## schema.test(schema)

quickly test an individual schema

```javascript
field = schema.test("email@email.com", {type:"email", trim:true, properties:{min:5}});
```

## schema.create(schema)

schema for a simple object of one integer value

```javascript
schema =
{
         // [string] value for acceppted parameters of the object you want to test
  "wins":
  {
    // [string (built in types) or function (custom types)] the type declaration for accepted values
    "type": "int",
      
    // [string (built in filters) or function (custom filters) or array (mix and match!)] 
    // OPTIONAL, filters to process and optionally modify values
    "filters": ["trim", "toInt", custom_filter],
      
    // [anything] 
    // OPTIONAL, the default value if none is supplied by the object
    "default": 0,
      
    // [boolean] 
    // OPTIONAL, if true, this parameter must exist to validate
    "required": true,

    // [boolean] 
    // OPTIONAL, if true, this parameter can be null, despite any other rules
    "allownull": true,
 
    // [object] 
    // OPTIONAL, functions are custom property checks, else a built in property will be looked up
    "properties": {max:100, min:0, special:custom_property},
      
    // [string, object] OPTIONAL, if there is an error, you can override the message that is returned
    // use a string or the "default" key to use the default error message
    // keys can be any property key that was used as well as "filters", "required", "type"
    "error": {max: "too many wins", min: "too few wins", "default": "something is wrong with your wins value"}
  }
};
```

schema with embedded schemas for object and array types

```javascript
schema =
{
  "user":
  {
    "type":  "object",
    "schema":
    {
      "name":  { type: "string", properties: { max: 255 }, required: true},
      "email": { type: "email", error: "email is not a valid email address"}
    },
    "error": "user needs an email and a name"
  },
      
  "tags":
  {
    "type":  "array",
    "schema":
    {
      "type": "string"
    },
    "properties":  { max: 10, min: 3},
    "error": { max: "too many tags", min: "too few tags" }
  }
};
```	

## schema.types
	
built in types 

	[string+, string (empty string allowed), alpha, alphanum, email, object, array, date, number, int, boolean, url, zipcode]

to extend, add a function onto schema.types that accepts a value and returns a boolean if the type matches

test is run AFTER schema.filters are run

```javascript
schema.types.awesome = function(value)
{
  if(isAwesome(value))
    return true;
  else
    return false;
}
```
## schema.filters
	
built in filters:

	[toInt, toFloat, toString, toDate, toBoolean (converts on/off, true/false, 1/0, yes/no to bools), trim, lowercase, uppercase]

to extend, add a function onto schema.filters that takes in a value and returns the updated value

filters are run BEFORE schema.test is run

```javascript
schema.filters.surround = function(value)
{
  if(value == needs_surrounding)
    return "----" + value + "----";
  else
    return value;
}
```

## schema.properties

built in properties

	[max, min, regex, in]

to extend, add a function onto schema.properties that takes in a value and any additional arguments

properties are run AFTER test and filters

```javascript
schema.properties.unique = function(value)
{
  if(isArray(value) && allUnique(value))
    return true;
  else
    return false;
}

schema.properties.notIn = function(value, badwords)
{
  if(badwords.indexOf(value) != -1)
    return false;
  else
    return true;
}
```

# ideas

   - make it work in the browser for client side validation
   - strict mode, dissallowing extra parameters from being passed in
   - dependency property making one parameters existance depend on another
   - more types (phone numbers, credit card, ip address)
   - more filters (camelcase, encode/unencode)
   - more properties
