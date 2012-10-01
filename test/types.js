describe("schema types", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;
  
   it("string", function() 
   {
      var schema = schemajs.create(
      {
          input: {type:'string'}
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: 112390123});
      var input3 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
   });
   
   it("string+", function() 
   {
      var schema = schemajs.create(
      {
          input: {type:'string+'}
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: 112390123});
      var input3 = schema.validate({input: ''});
      var input4 = schema.validate({input: "  "});
      var input5 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(!input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
   });
   
   it("number", function() 
   {
      var schema = schemajs.create(
      {
          input: {type:'number'}
      });
      
      var input1 = schema.validate({input: 123123123});
      var input2 = schema.validate({input: '123123'});
      var input3 = schema.validate({input: 1231.3123123});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("alpha", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'alpha'}
      });
      
      var input1 = schema.validate({input: 'abcdefg'});
      var input2 = schema.validate({input: 'abcd123'});
      var input3 = schema.validate({input: 'what about spaces'});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("alphanum", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'alphanum'}
      });
      
      var input1 = schema.validate({input: 'abcdefg'});
      var input2 = schema.validate({input: 'abcd123'});
      var input3 = schema.validate({input: 'what about spaces'});
      var input4 = schema.validate({});
      var input5 = schema.validate({input: null});


      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
      expect(!input5.valid).to.be.ok;
   });
   
   it("email", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'email'}
      });
      
      var input1 = schema.validate({input: 'zelda@hyrule.com'});
      var input2 = schema.validate({input: 'master sword'});
      var input3 = schema.validate({input: 'zelda@hyrule'});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("object", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'object'}
      });
      
      var input1 = schema.validate({input: {patents:'needs reform'}});
      var input2 = schema.validate({input: 'microsoft'});
      var input3 = schema.validate({input: ['apple', 'oracle']});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("array", function()
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
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
   });
   
   it("date", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'date'}
      });
      
      var input1 = schema.validate({input: new Date()});
      var input2 = schema.validate({input: '11-03-1980'});
      var input3 = schema.validate({input: 'yesterday'});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("int", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'int'}
      });
      
      var input1 = schema.validate({input: 123123123});
      var input2 = schema.validate({input: '123123'});
      var input3 = schema.validate({input: 1231.3123123});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("boolean", function()
   {
      var schema = schemajs.create(
      {
          input: {type:'boolean'}
      });
      
      var input1 = schema.validate({input: true});
      var input2 = schema.validate({input: false});
      var input3 = schema.validate({input: 1});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
   
   it("url", function()
   {
      var schema = schemajs.create(
      {
          link: {type:'url'}
      });
      
      var link1 = schema.validate({link:'www.eleith.com'});
      var link2 = schema.validate({link:'https://eleith.com'});
      var link3 = schema.validate({link:'google'});
      var link4 = schema.validate({});
   
      expect(link1.valid).to.be.ok;
      expect(link2.valid).to.be.ok;
      expect(!link3.valid).to.be.ok;
      expect(link4.valid).to.be.ok;
   });
   
   it("zipcode", function()
   {
      var schema = schemajs.create(
      {
         input: {type:'zipcode'}
      });
      
      var input1 = schema.validate({input: '99025'});
      var input2 = schema.validate({input: '7745'});
      var input3 = schema.validate({input: 94302});
      var input4 = schema.validate({});
   
      expect(input1.valid).to.be.ok;
      expect(!input2.valid).to.be.ok;
      expect(input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
   });
});
