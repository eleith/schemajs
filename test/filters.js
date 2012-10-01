describe("filter schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("toInt filter", function()
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
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
      expect(!input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
   });
   
   it("toFloat filter", function()
   {
      var schema = schemajs.create(
      {
          input: {type:"number", filters:["toFloat"]}
      });
      
      var input1 = schema.validate({input: '100.123'});
      var input2 = schema.validate({input: 101.123});
      var input3 = schema.validate({input: 'oneohthree'});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("toString filter", function() 
   {
      var schema = schemajs.create(
      {
          input: {type:"string", filters:["toString"]}
      });
      
      var input1 = schema.validate({input: 1123});
      var input2 = schema.validate({input: ['a', 'b']});
      var input3 = schema.validate({input: 'oneohthree'});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("toDate filter", function()
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
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
      expect(!input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
   });
   
   it("toBoolean filter", function()
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
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
   
      expect(input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
      expect(!input6.valid).to.be.ok;
   
      expect(input7.valid).to.be.ok;
      expect(input8.valid).to.be.ok;
      expect(!input9.valid).to.be.ok;
   
      expect(input10.valid).to.be.ok;
      expect(input11.valid).to.be.ok;
      expect(!input12.valid).to.be.ok;
   
      expect(input13.valid).to.be.ok;
   });
   
   it("testing trim filter", function()
   {
      var schema = schemajs.create(
      {
          input: {type:"string", filters:["trim"]}
      });
      
      var input1 = schema.validate({input: ' nachos '});
      var input2 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input1.data.input).to.equal('nachos');
      expect(input2.valid).to.be.ok;
   });
   
   it("lowercase filter", function()
   {
      var schema = schemajs.create(
      {
          input: {type:"string", filters:["lowercase"]}
      });
      
      var input1 = schema.validate({input: 'BURRITOS'});
      var input2 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input1.data.input).to.equal('burritos');
      expect(input2.valid).to.be.ok;
   });
   
   it("uppercase filter", function()
   {
      var schema = schemajs.create(
      {
          input: {type:"string", filters:["uppercase"]}
      });
      
      var input1 = schema.validate({input: 'donuts'});
      var input2 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input1.data.input).to.equal('DONUTS');
      expect(input2.valid).to.be.ok;
   });
});
