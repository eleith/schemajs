describe("complex schemas", function()
{
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   it("arrays", function()
   {
      var schema = schemajs.create(
      {
          input: 
          {
            type:'array',
            schema:
            {
               type: 'number'
            }
          }
      });

      var schema2 = schemajs.create(
      {
          input: 
          {
            type:'array',
            schema:
            {
               type: 'number'
            },
            allownull: true
          }
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: [112390123]});
      var input3 = schema.validate({input: [112390123, 'username']});
      var input4 = schema.validate({});
      var input5 = schema.validate({input: null});
      var input6 = schema2.validate({input: null});
  
      expect(!input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
      expect(!input5.valid).to.be.ok;
      expect(input6.valid).to.be.ok;
   });

   it("arrays and objects", function()
   {
      var schema = schemajs.create(
      {
          input: 
          {
            type:'array',
            schema:
            {
               type: 'object',
               schema: {
                  label:{type:"string+"},
                  num:{type:"number"}
               }
            }
          }
      });
      
      var input1 = schema.validate({input: 'laksjdf'});
      var input2 = schema.validate({input: [{label:"hi", num:5}, {label:"bye", num:0}]});
      var input3 = schema.validate({input: [{label:"hi", num:5}, {label:0, num:0}]});
      var input4 = schema.validate({input: [{label:"hi", num:5}, "oops"]});
      var input5 = schema.validate({});
   

      expect(!input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(!input3.valid).to.be.ok;
      expect(!input4.valid).to.be.ok;
      expect(input5.valid).to.be.ok;
   });

   
   it("testing complex object type", function()
   {
      var schema = schemajs.create(
      {
          input: 
          {
            type:'object',
            schema:
            {
               name:  { type: "string", properties: { max: 255 }, required: true},
               email: { type: "email", error: "email is not a valid email address"}
            }
          }
      });

      var schema2 = schemajs.create(
      {
          input: 
          {
            type:'object',
            schema:
            {
               name:  { type: "string", properties: { max: 255 }, required: true},
               email: { type: "email", error: "email is not a valid email address"}
            },
            allownull: true
          }
      });
      
      var input1 = schema.validate({input: 'username'});
      var input2 = schema.validate({input: {name:"x", email:"x@xyz.com"}});
      var input3 = schema.validate({input: {name:123, email:"x@xyz.com"}});
      var input4 = schema.validate({});
      var input5 = schema.validate({input:null});
      var input6 = schema2.validate({input:null});

      expect(!input1.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input2.valid).to.be.ok;
      expect(input4.valid).to.be.ok;
      expect(!input5.valid).to.be.ok;
      expect(input6.valid).to.be.ok;
   });
});
