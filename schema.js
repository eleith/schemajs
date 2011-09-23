var schema = require("./lib/schema.js");

Object.keys(schema).forEach(function(export)
{
	exports[export] = schema[export];
});
