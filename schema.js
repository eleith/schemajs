var schema = require("./lib/schema.js");

Object.keys(schema).forEach(function(one)
{
	exports[one] = schema[one];
});
