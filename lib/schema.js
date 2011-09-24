var _ = require('underscore');
var rules = require('./rules.js');

var Schema = function(schema)
{
	this.schema = schema;
};

Schema.prototype.validate = function(data)
{
	var params  = Object.keys(this.schema);
	var errors  = {};
	var values  = {};
   var get     = typeof(data) == "function" ? data : function(p) { return data[p]; };

	for(var i = 0; i < params.length; i++)
	{
		var schema = this.schema[params[i]];

		try
		{
			values[params[i]] = (rules.create(params[i], schema)).apply(get(params[i]));

			// does this rule contain embedded schemas
			if(typeof(schema.schema) == "object" && !_.isArray(schema.schema) && Object.keys(schema.schema).length && !_.isUndefined(values[params[i]]))
			{
				if(schema.type == "object")
				{
					Object.keys(schema.schema).forEach(function(param)
					{
						try
						{
							values[params[i]][param] = rules.create(params[i] + "." + param, schema.schema).apply(get(params[i])[param]);
						}
						catch(error)
						{
							errors[params[i] + "." + param] = error;
						}
					});
				}
				else if(schema.type == "array")
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

exports.types        = rules.types;
exports.properties   = rules.properties;
exports.filters      = rules.filters;

exports.create = function(schema) { return new Schema(schema); }

exports.middleware = function(schema)
{
   return function(req, res, next)
   {
      req.form = new Schema(schema).validate(req.route.method == "post" ? req.body : req.query);
      next();
   }
}
