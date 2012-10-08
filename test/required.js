describe("required schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("required", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'string', required:true},
          output: {type:'string'}
      });
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
   });

   it("allownull", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'string', required:true, allownull:true},
          output:{type:'string'}
      });

      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({});
      var input3 = schema.validate({input:null, output:"hi there"});
  
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
   });
});
