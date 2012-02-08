var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing complex array type", function(t) 
{
   var schema = schemajs.create(
   {
       input: 
       {
         type:'array',
         schema:
         {
            type: 'number'
         }
       }
   });
   
   var input1 = schema.validate({input: 'username'});
   var input2 = schema.validate({input: [112390123]});
   var input3 = schema.validate({input: [112390123, 'username']});
   var input4 = schema.validate({});

   t.ok(!input1.valid, 'input1 is not valid (not an array)');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(input2.valid, 'input3 is not valid (2nd element is not a number)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing complex object type", function(t) 
{
   var schema = schemajs.create(
   {
       input: 
       {
         type:'object',
         schema:
         {
            name:  { type: "string", properties: { max: 255 }, required: true},
            email: { type: "email", error: "email is not a valid email address"}
         }
       }
   });
   
   var input1 = schema.validate({input: 'username'});
   var input2 = schema.validate({input: {name:"x", email:"x@xyz.com"}});
   var input3 = schema.validate({input: {name:123, email:"x@xyz.com"}});
   var input4 = schema.validate({});

   t.ok(!input1.valid, 'input1 is not valid (not an object)');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(input2.valid, 'input3 is not valid (input.name is not a string)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});
