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

   it('should execute a function supplied for default', function () {
     var schema = schemajs.create({
       sound: { type: 'string', 'default': function () { return 'moo moo'; } }
     });

     var input1 = schema.validate({ sound: 'meow' });
     var input2 = schema.validate({});

     expect(input1.data.sound).to.equal('meow');
     expect(input2.data.sound).to.equal('moo moo');
   });

   it("respects non string/object/array values with defaults", function () {
     var
     input1, input2,
     schema = schemajs.create({
       counter: {
         type: 'number',
         'default': 30
       }
     });

     input1 = schema.validate({
       counter: 9
     });
     input2 = schema.validate({});

     expect(input1.data.counter).to.equal(9);
     expect(input2.data.counter).to.equal(30);
   });
});
