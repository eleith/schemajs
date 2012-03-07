var _ = require('underscore');
var rules = require('./rules.js');

var Schema = function(schema)
{
	this.schema = schema;
};

Schema.prototype.validate = function(data)
{
	var params  = _.keys(this.schema);
	var errors  = {};
	var values  = {};
   var value;
   var get     = typeof(data) == "function" ? data : function(p) { return data[p]; };

	for(var i = 0; i < params.length; i++)
	{
		var schema = this.schema[params[i]];

		try
		{
         // if undefined, don't store it.
         value = rules.create(params[i], schema).apply(get(params[i]));

         if(!_.isUndefined(value)) 
         {
            values[params[i]] = value;
         }

			// does this rule contain embedded schemas
			if(typeof(schema.schema) == "object" && !_.isArray(schema.schema) && _.keys(schema.schema).length && !_.isUndefined(values[params[i]]))
			{
				if(schema.type == "object")
				{
					_.keys(schema.schema).forEach(function(param)
					{
						try
						{
                     // if undefined, don't store it
                     value = rules.create(params[i] + "." + param, schema.schema[param]).apply(get(params[i])[param]);

                     if(!_.isUndefined(value))
                     {
                        values[params[i]][param] = value;
                     }
						}
						catch(error)
						{
                     if(!errors[params[i]] || typeof(errors[params[i]]) != 'object')
                        errors[params[i]] = {};

							errors[params[i]][param] = error;
						}
					});
				}
				else if(schema.type == "array")
				{
					values[params[i]].forEach(function(value, index)
					{
						try
						{
                     // if not required and undefined, don't store in values!
							values[params[i]][index] = rules.create(params[i] + "[" + index + "]", schema.schema).apply(value);
						}
						catch(error)
						{
                     if(!_.isArray(errors[params[i]]))
                        errors[params[i]] = [];

                     errors[params[i]][index] = error;
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

	return {data:values, errors:errors, valid:_.keys(errors).length === 0};
};

exports.types        = rules.types;
exports.test         = function(value, schema) { return (new Schema({input:schema})).validate({input:value}); };
exports.properties   = rules.properties;
exports.filters      = rules.filters;
exports.create       = function(schema) { return new Schema(schema); };
exports.middleware   = function(schema)
{
   return function(req, res, next)
   {
      req.form = new Schema(schema).validate(req.route.method == "post" ? req.body : req.query);
      next();
   };
};
