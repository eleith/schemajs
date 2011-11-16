var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing required", function(t)
{
   var schema = schemajs.create(
   {
       input: {type:'string', required:true},
       output: {type:'string'},
   });
   var input1 = schema.validate({input: 'username'});
   var input2 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is valid (it is required to exist)');

   t.end();
});
