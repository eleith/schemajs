describe("filter schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;
   it("minimum string length property", function()
   {
      var schema = schemajs.create(
      {
          username: {properties: {min:2}}
      });
      
      var user1 = schema.validate({username: 'username'});
      var user2 = schema.validate({username: 'a'});
      var user3 = schema.validate({username: 'ab'});
      var user4 = schema.validate({});
   
      expect(user1.valid).to.be.ok;
      expect(!user2.valid).to.be.ok;
      expect(user3.valid).to.be.ok;
      expect(user4.valid).to.be.ok;
   });
   
   it("maximum string length property", function()
   {
      var schema = schemajs.create({
          username: {properties: {max: 16}}
      });
      
      var user1 = schema.validate({username: 'username'});
      var user2 = schema.validate({username: '01234567890abcdefg'});
      var user3 = schema.validate({username: '0123456789abcdef'});
      var user4 = schema.validate({});
   
      expect(user1.valid).to.be.ok;
      expect(!user2.valid).to.be.ok;
      expect(user3.valid).to.be.ok;
      expect(user4.valid).to.be.ok;
   });
   
   it("regex property", function()
   {
      var schema = schemajs.create({
         mobile: {properties:{regex:/\d{3}-\d{3}-\d{4}/}}
      });
   
      var mobile1 = schema.validate({mobile: '123-456-7890'});
      var mobile2 = schema.validate({mobile: '23-456-7890'});
      var mobile3 = schema.validate({});
   
      expect(mobile1.valid).to.be.ok;
      expect(!mobile2.valid).to.be.ok;
      expect(mobile3.valid).to.be.ok;
   });
   
   it("testing 'in' property", function()
   {
      var schema = schemajs.create({
         fruit: {properties:{'in': ['apple', 'pear', 'tomato']}}
      });
   
      var fruit1 = schema.validate({fruit: 'apple'});
      var fruit2 = schema.validate({fruit: 'peas'});
      var fruit3 = schema.validate({});
   
      expect(fruit1.valid).to.be.ok;
      expect(!fruit2.valid).to.be.ok;
      expect(fruit3.valid).to.be.ok;
   });
  
   it("testing nested properties", function()
   {
      var schema = schemajs.create({
         alphabet: {
            'type':"array",
            'properties':{'min':1,'max':3},
            'required':true,
            schema: {
               'type':"string",
               'properties':{'min':1, 'max':3}, 
               'required':true
            }
         }
      });
      
      var abc1 = schema.validate({alphabet:["a","b","c"]});
      var abc2 = schema.validate({alphabet:["aaaaa","bbbbbb","ccccc"]});

      //test validation
      expect(abc1.valid).to.be.ok;
      expect(abc2.valid).to.be.false;
      //test data
      expect(abc1.data).to.deep.equal({alphabet:["a","b","c"]});
      //if false valid, should not be any data
      expect(Object.keys(abc2.data).length).to.equal(0); 


      var schema = schemajs.create({
         work: {
            'type':'string',
            'properties':{'min':1,'max':10}
         }
      });

      var job = schema.validate({work:"engineer"});
      var job2 = schema.validate({work:""});

      expect(job.valid).to.be.ok;
      expect(job.data).to.be.ok;

      expect(job2.valid).to.be.false;
      expect(Object.keys(job2.data).length).to.equal(0);
   });

   it("testing custom property", function()
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
   
      expect(planet1.valid).to.be.ok;
      expect(!planet2.valid).to.be.ok;
      expect(planet3.valid).to.be.ok;
   
      delete schemajs.properties.notIn;
   });
});
