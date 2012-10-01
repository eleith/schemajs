describe("schema errors", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("basic error", function()
   {
      var schema = schemajs.create(
      {
          sound: {type:'string', error:'silence!', required:true}
      });

      var input1 = schema.validate({sound: 'meow'});
      var input2 = schema.validate({sound: 0});
      var input3 = schema.validate({});
   
      expect(input1.data.sound).to.equal('meow');
      expect(!input2.valid).to.be.ok;
      expect(input2.errors.sound).to.equal('silence!');
      expect(!input3.valid).to.be.ok;
      expect(input3.errors.sound).to.equal('silence!');
   });
   
   it("detailed errors", function()
   {
      var schema = schemajs.create(
      {
          sound: {type:'string', error:{type:'sound must be speakable', required:'sound is missing'}, required:true}
      });

      var input1 = schema.validate({sound: 'meow'});
      var input2 = schema.validate({sound: 0});
      var input3 = schema.validate({});
   
      expect(input1.data.sound).to.equal('meow');
      expect(!input2.valid).to.be.ok;
      expect(input2.errors.sound).to.equal('sound must be speakable');
      expect(!input3.valid).to.be.ok;
      expect(input3.errors.sound).to.equal('sound is missing');
   });
});
