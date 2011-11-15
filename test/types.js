var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing string type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'string'}
   });
   
   var input1 = schema.validate({input: 'username'});
   var input2 = schema.validate({input: 112390123});
   var input3 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not a string)');
   t.ok(input3.valid, 'input3 is valid (not required to exist)');

   t.end();
});

tap.test("testing string+ type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'string+'}
   });
   
   var input1 = schema.validate({input: 'username'});
   var input2 = schema.validate({input: 112390123});
   var input3 = schema.validate({input: ''});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not a string)');
   t.ok(!input3.valid, 'input3 is invalid (not a non-empty string)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing number type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'number'}
   });
   
   var input1 = schema.validate({input: 123123123});
   var input2 = schema.validate({input: '123123'});
   var input3 = schema.validate({input: 1231.3123123});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not a number)');
   t.ok(input3.valid, 'input3 is valid');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing alpha type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'alpha'}
   });
   
   var input1 = schema.validate({input: 'abcdefg'});
   var input2 = schema.validate({input: 'abcd123'});
   var input3 = schema.validate({input: 'what about spaces'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not an alpha)');
   t.ok(!input3.valid, 'input3 is invalid (not an alpha)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing alphanum type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'alphanum'}
   });
   
   var input1 = schema.validate({input: 'abcdefg'});
   var input2 = schema.validate({input: 'abcd123'});
   var input3 = schema.validate({input: 'what about spaces'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(!input3.valid, 'input3 is invalid (not an alphanum)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing email type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'email'}
   });
   
   var input1 = schema.validate({input: 'zelda@hyrule.com'});
   var input2 = schema.validate({input: 'master sword'});
   var input3 = schema.validate({input: 'zelda@hyrule'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not an email)');
   t.ok(!input3.valid, 'input3 is invalid (not an email)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing object type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'object'}
   });
   
   var input1 = schema.validate({input: {patents:'needs reform'}});
   var input2 = schema.validate({input: 'microsoft'});
   var input3 = schema.validate({input: ['apple', 'oracle']});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not an object)');
   t.ok(!input3.valid, 'input3 is invalid (not an object)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing array type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'array'}
   });
   
   var input1 = schema.validate({input: ['spiderman', 'magneto']});
   var input2 = schema.validate({input: 'superman'});
   var input3 = schema.validate({input: {xmen:'cyclops'}});
   var input4 = schema.validate({input: []});
   var input5 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not an array)');
   t.ok(!input3.valid, 'input3 is invalid (not an array)');
   t.ok(input4.valid, 'input4 is valid');
   t.ok(input5.valid, 'input5 is valid (not required to exist)');

   t.end();
});

tap.test("testing date type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'date'}
   });
   
   var input1 = schema.validate({input: new Date()});
   var input2 = schema.validate({input: '11-03-1980'});
   var input3 = schema.validate({input: 'yesterday'});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not a date)');
   t.ok(!input3.valid, 'input3 is invalid (not a date)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing number type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'int'}
   });
   
   var input1 = schema.validate({input: 123123123});
   var input2 = schema.validate({input: '123123'});
   var input3 = schema.validate({input: 1231.3123123});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not an int)');
   t.ok(!input3.valid, 'input3 is invalid (not an int)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing boolean type", function(t) 
{
   var schema = schemajs.create(
   {
       input: {type:'boolean'}
   });
   
   var input1 = schema.validate({input: true});
   var input2 = schema.validate({input: false});
   var input3 = schema.validate({input: 1});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(input2.valid, 'input2 is valid');
   t.ok(!input3.valid, 'input3 is invalid (not a boolean)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});

tap.test("testing url type", function(t) 
{
   var schema = schemajs.create(
   {
       link: {type:'url'}
   });
   
   var link1 = schema.validate({link: 'www.eleith.com'});
   var link2 = schema.validate({link: 'https://eleith.com'});
   var link3 = schema.validate({link: 'google'});
   var link4 = schema.validate({});

   t.ok(link1.valid, 'link1 is valid');
   t.ok(link2.valid, 'link2 is valid');
   t.ok(!link3.valid, 'link3 is invalid (not an url)');
   t.ok(link4.valid, 'link4 is valid (not required to exist)');

   t.end();
});

tap.test("testing zipcode type", function(t) 
{
   var schema = schemajs.create(
   {
      input: {type:'zipcode'}
   });
   
   var input1 = schema.validate({input: '99025'});
   var input2 = schema.validate({input: '7745'});
   var input3 = schema.validate({input: 94302});
   var input4 = schema.validate({});

   t.ok(input1.valid, 'input1 is valid');
   t.ok(!input2.valid, 'input2 is invalid (not a zipcode)');
   t.ok(input3.valid, 'input3 is invalid (not a zipcode)');
   t.ok(input4.valid, 'input4 is valid (not required to exist)');

   t.end();
});
