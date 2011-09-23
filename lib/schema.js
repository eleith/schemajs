var _ = require('underscore');
var rules = require('./rules.js');

var Schema = function(schema)
{
	this.schema = schema;
};

Schema.prototype.validate = function(_form)
{
	var form = typeof(_form) == "object" ? _form : {};
	var params = Object.keys(this.schema);
	var errors = {};
	var values = {};

	for(var i = 0; i < params.length; i++)
	{
		var schema = this.schema[params[i]];

		try
		{
			values[params[i]] = (rules.create(params[i], schema)).apply(form[params[i]]);

			// does this rule contain even more rules?
			if(typeof(schema.schema) == "object" && !_.isArray(schema.schema) && Object.keys(schema.schema).length)
			{
				if(schema.type == "object")
				{
					Object.keys(schema.schema).forEach(function(param)
					{
						try
						{
							values[params[i]][param] = rules.create(params[i] + "." + param, schema.schema).apply(form[params[i]][param]);
						}
						catch(error)
						{
							errors[params[i] + "." + param] = error;
						}
					});
				}
				else if(schema.type == "array" && Array.isArray(values[params[i]]))
				{
					values[params[i]].forEach(function(value, index)
					{
						try
						{
							values[params[i]][index] = rules.create(params[i] + "[" + index + "]", schema.schema).apply(value);
						}
						catch(error)
						{
							errors[params[i] + "[" + index + "]"] = error;
						}
					});
				}
			}
		}
		catch(error)
		{
			errors[params[i]] = error;
		}
	}

	return {data:values, errors:errors, valid:Object.keys(errors).length == 0};
};

exports.create = function(schema) { return new Schema(schema); }
exports.types = rules.types;
exports.properties = rules.properties;
exports.filters = rules.filters;
