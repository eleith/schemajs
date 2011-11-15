var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing toInt filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"int", filters:["toInt"]}
   });
   
   var input1 = schema.validate({input: '100'});
   var input2 = schema.validate({input: 101});
   var input3 = schema.validate({input: '102a'});
   var input4 = schema.validate({input: 'oneohthree'});
   var input5 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(input3.valid, 'input3 is valid');
   t.ok(!input4.valid, 'input4 is not valid');
   t.ok(input5.valid, 'input5 is valid (not required to exist)');

   t.end();
});

tap.test("testing toFloat filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"number", filters:["toFloat"]}
   });
   
   var input1 = schema.validate({input: '100.123'});
   var input2 = schema.validate({input: 101.123});
   var input3 = schema.validate({input: 'oneohthree'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(!input3.valid, 'input3 is not valid');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing toString filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"string", filters:["toString"]}
   });
   
   var input1 = schema.validate({input: 1123});
   var input2 = schema.validate({input: ['a', 'b']});
   var input3 = schema.validate({input: 'oneohthree'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(input3.valid, 'input3 is valid');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing toDate filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"date", filters:["toDate"]}
   });
   
   var input1 = schema.validate({input: '11-24-2011'});
   var input2 = schema.validate({input: '11/24/11'});
   var input3 = schema.validate({input: 'November 24, 2011'});
   var input4 = schema.validate({input: 'yesterday'});
   var input5 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(input3.valid, 'input3 is valid');
   t.ok(!input4.valid, 'input4 is not valid (not a Date)');
   t.ok(input5.valid, 'input5 is valid (not required to exist)');

   t.end();
});

tap.test("testing toBoolean filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"boolean", filters:["toBoolean"]}
   });
   
   var input1 = schema.validate({input: 0});
   var input2 = schema.validate({input: 1});
   var input3 = schema.validate({input: 2});

   var input4 = schema.validate({input: 'yes'});
   var input5 = schema.validate({input: 'no'});
   var input6 = schema.validate({input: 'maybe'});

   var input7 = schema.validate({input: 'true'});
   var input8 = schema.validate({input: 'false'});
   var input9 = schema.validate({input: 'neither'});

   var input10 = schema.validate({input: true});
   var input11 = schema.validate({input: false});
   var input12 = schema.validate({input: null});

   var input13 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(!input3.valid, 'input3 is valid (not a boolean)');

   t.ok(input4.valid, 'input4 is valid');
   t.ok(input5.valid, 'input5 is valid');
   t.ok(!input6.valid, 'input6 is valid (not a boolean)');

   t.ok(input7.valid, 'input7 is valid');
   t.ok(input8.valid, 'input8 is valid');
   t.ok(!input9.valid, 'input9 is valid (not a boolean)');

   t.ok(input10.valid, 'input10 is valid');
   t.ok(input11.valid, 'input11 is valid');
   t.ok(!input12.valid, 'input12 is valid (not a boolean)');

   t.ok(input13.valid, 'input13 is valid (not required to exist)');

   t.end();
});

tap.test("testing trim filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"string", filters:["trim"]}
   });
   
   var input1 = schema.validate({input: ' nachos '});
   var input2 = schema.validate({});

   t.ok(input1.valid && input1.data.input == 'nachos', 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid (not required to exist)');

   t.end();
});

tap.test("testing lowercase filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"string", filters:["lowercase"]}
   });
   
   var input1 = schema.validate({input: 'BURRITOS'});
   var input2 = schema.validate({});

   t.ok(input1.valid && input1.data.input == 'burritos', 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid (not required to exist)');

   t.end();
});

tap.test("testing uppercase filter", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:"string", filters:["uppercase"]}
   });
   
   var input1 = schema.validate({input: 'donuts'});
   var input2 = schema.validate({});

   t.ok(input1.valid && input1.data.input == 'DONUTS', 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid (not required to exist)');

   t.end();
});
