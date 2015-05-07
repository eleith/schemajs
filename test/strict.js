describe("strict schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("additional keys, strict via argument", function()
   {
      var schema = schemajs.create({
        sound: {type:'string', 'default':'mooo'}
      });

      var input = schema.validate({sound: 'meow', type: "cat"}, {strict: true});
      expect(input.valid).to.equal(false);
      expect(input.errors.type).to.equal("Additional key not defined in schema");
   });

   it("additional keys non strict", function()
   {
      var schema = schemajs.create({
        sound: {type:'string', 'default':'mooo'}
      });

      var input = schema.validate({sound: 'meow', type: "cat"});
      expect(input.valid).to.equal(true);
      expect(input.data.sound).to.equal("meow");
      expect(input.data.type).to.equal(undefined);
   });

});
