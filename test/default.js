var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing default", function(t)
{
   var schema = schemajs.create(
   {
       sound: {type:'string', 'default':'mooo'},
   });
   var input1 = schema.validate({sound: 'meow'});
   var input2 = schema.validate({});

   t.ok(input1.data.sound == 'meow', 'input1 is valid');
   t.ok(input2.data.sound == 'mooo', 'input2 is valid');

   t.end();
});
