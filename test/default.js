describe("default schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("default values", function()
   {
      var schema = schemajs.create(
      {
          sound: {type:'string', 'default':'mooo'}
      });

      var input1 = schema.validate({sound: 'meow'});
      var input2 = schema.validate({});
   
      expect(input1.data.sound).to.equal("meow");
      expect(input2.data.sound).to.equal("mooo");
   });
});
