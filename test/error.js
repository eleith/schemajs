var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing basic error", function(t)
{
   var schema = schemajs.create(
   {
       sound: {type:'string', error:'silence!', required:true},
   });
   var input1 = schema.validate({sound: 'meow'});
   var input2 = schema.validate({sound: 0});
   var input3 = schema.validate({});

   t.ok(input1.data.sound == 'meow', 'input1 is valid');
   t.ok(!input2.valid && input2.errors.sound == 'silence!', 'input2 is not valid (proper error raised)');
   t.ok(!input3.valid && input3.errors.sound == 'silence!', 'input3 is not valid (proper error raised)');

   t.end();
});

tap.test("testing detailed errors", function(t)
{
   var schema = schemajs.create(
   {
       sound: {type:'string', error:{type:'sound must be speakable', required:'sound is missing'}, required:true},
   });
   var input1 = schema.validate({sound: 'meow'});
   var input2 = schema.validate({sound: 0});
   var input3 = schema.validate({});

   t.ok(input1.data.sound == 'meow', 'input1 is valid');
   t.ok(!input2.valid && input2.errors.sound == 'sound must be speakable', 'input2 is not valid (proper error raised)');
   t.ok(!input3.valid && input3.errors.sound == 'sound is missing', 'input3 is not valid (proper error raised)');

   t.end();
});
