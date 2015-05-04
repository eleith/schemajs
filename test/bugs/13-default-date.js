describe("bugs", function() {
   /*jshint expr:true*/
   var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
   var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

   // <https://github.com/eleith/schemajs/pull/13>
   it("Dates defaulting when not empty (#13)", function() {
      var date1 = new Date;
      var date2 = new Date(1985, 12);
      var schema = schemajs.create({
        dateTime: {type:'date', 'default': date1}
      });

      var input1 = schema.validate({});
      var input2 = schema.validate({dateTime: date2});

      expect(input1.data.dateTime).to.equal(date1);
      expect(input2.data.dateTime).to.equal(date2);
   });
});
