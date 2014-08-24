var _ = require('underscore');
var rules = require('./rules.js');

var Schema = function(schema) {
  this.schema = schema;
};

var checkArray = function(schema, key, errors, values) {
  values[key].forEach(function(value, index) {
    try {
      if(schema.schema.schema) {
        // if array has another schema, then we want objects!
        value = rules.create(key, {type:'object'}).apply(value);
        var results = (new Schema(schema.schema.schema)).validate(value);
        if(!results.valid)
        {
          errors[key] = errors[key] || [];
          errors[key][index] = results.errors;
        }
        values[key][index] = results.data;
      }
      else
        values[key][index] = rules.create(key + "[" + index + "]", schema.schema).apply(value);
    } catch (error) {
      if (!_.isArray(errors[key])) errors[key] = [];
      errors[key][index] = error;
    }
  });
};

/*jshint loopfunc:true*/

Schema.prototype.validate = function(data) {
  var params = _.keys(this.schema);
  var errors = {};
  var values = {};
  var value;
  var get = typeof(data) == "function" ? data : function(p) {
      return data[p];
    };

  for (var i = 0; i < params.length; i++) {
    var schema = this.schema[params[i]];

    try {
      // if undefined, don't store it.
      value = rules.create(params[i], schema).apply(get(params[i]));

      if (!_.isUndefined(value)) {
        values[params[i]] = value;
      }

      // does this rule contain embedded schemas
      if (typeof(schema.schema) == "object" && 
          !_.isArray(schema.schema) && 
          _.keys(schema.schema).length && 
          !_.isUndefined(values[params[i]])) {

        if(!(schema.allownull && _.isNull(values[params[i]]))) {
          if (schema.type == "object") {
            var results = (new Schema(schema.schema)).validate(values[params[i]]);

            if(!results.valid)
              errors[params[i]] = results.errors;
            values[params[i]] = results.data;
          } else if (schema.type == "array") {
            checkArray(schema, params[i], errors, values, get);
          }
        }
      }
    } catch (error) {
      errors[params[i]] = error;
    }
  }

  return {
    data: values,
    errors: errors,
    valid: _.keys(errors).length === 0
  };
};

exports.types = rules.types;
exports.test = function(value, schema) {
  return (new Schema({
    input: schema
  })).validate({
    input: value
  });
};
exports.properties = rules.properties;
exports.filters = rules.filters;
exports.create = function(schema) {
  return new Schema(schema);
};
exports.middleware = function(schema) {
  return function(req, res, next) {
    req.form = new Schema(schema).validate(req.route.method == "post" ? req.body : req.query);
    next();
  };
};
