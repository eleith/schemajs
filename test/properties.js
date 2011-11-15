var tap        = require("tap");
var schemajs   = require('../schema');

tap.test("testing minimum string length property", function(t) 
{
   var schema = schemajs.create(
   {
       username: {properties: {min:2}}
   });
   
   var user1 = schema.validate({username: 'username'});
   var user2 = schema.validate({username: 'a'});
   var user3 = schema.validate({username: 'ab'});
   var user4 = schema.validate({});

   t.ok(user1.valid, 'user1 has valid username length');
   t.ok(!user2.valid, 'user2 has invalid username length (too short)');
   t.ok(user3.valid, 'user3 has valid username length (same as min)');
   t.ok(user4.valid, 'user4 has no username (not required to exist)');

   t.end();
});

tap.test("testing maximum string length property", function(t) 
{
   var schema = schemajs.create({
       username: {properties: {max: 16}}
   });
   
   var user1 = schema.validate({username: 'username'});
   var user2 = schema.validate({username: '01234567890abcdefg'});
   var user3 = schema.validate({username: '0123456789abcdef'});
   var user4 = schema.validate({});

   t.ok(user1.valid, 'user1 has valid username length');
   t.ok(!user2.valid, 'user2 has invalid username length (too long)');
   t.ok(user3.valid, 'user3 has valid username length (same as max)');
   t.ok(user4.valid, 'user4 has no username (not required to exist)');
   
   t.end();
});

tap.test("testing regex property", function(t) 
{
   var schema = schemajs.create({
      mobile: {properties:{regex:/\d{3}-\d{3}-\d{4}/}}
   });

   var mobile1 = schema.validate({mobile: '123-456-7890'});
   var mobile2 = schema.validate({mobile: '23-456-7890'});
   var mobile3 = schema.validate({});

   t.ok(mobile1.valid, 'mobile1 is valid (matches regex)');
   t.ok(!mobile2.valid, 'mobile2 is invalid (does not match regex)');
   t.ok(mobile3.valid, 'mobile3 is valid (not required to exist)');
   
   t.end();
});

tap.test("testing 'in' property", function(t) 
{
   var schema = schemajs.create({
      fruit: {properties:{'in': ['apple', 'pear', 'tomato']}}
   });

   var fruit1 = schema.validate({fruit: 'apple'});
   var fruit2 = schema.validate({fruit: 'peas'});
   var fruit3 = schema.validate({});

   t.ok(fruit1.valid, 'fruit1 is valid (is in array)');
   t.ok(!fruit2.valid, 'fruit2 is invalid (is not in array)');
   t.ok(fruit3.valid, 'fruit3 is valid (not required to exist)');

   t.end();
});

tap.test("testing custom property", function(t) 
{
   schemajs.properties.notIn = function(value, list)
   {
      return list.indexOf(value) == -1;
   };

   var schema = schemajs.create({
      planet: {properties:{notIn:['pluto', 'moon', 'sun']}}
   });

   var planet1 = schema.validate({planet: 'earth'});
   var planet2 = schema.validate({planet: 'pluto'});
   var planet3 = schema.validate({});

   t.ok(planet1.valid, 'planet1 is valid (is in array)');
   t.ok(!planet2.valid, 'planet2 is invalid (is not in array)');
   t.ok(planet3.valid, 'planet3 is valid (not required to exist)');

   delete schemajs.properties.notIn;
   t.end();
});
