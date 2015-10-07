/*jshint expr:true*/
var schemajs   = (typeof window === 'undefined') ? require('../schema') : window.schema;
var expect     = (typeof window === 'undefined') ? require('chai').expect : window.chai.expect;

describe("allownull schemas", function() {

  var schema = schemajs.create({
    input: {type: 'string', allownull: true}
  });

  it("should allow an attribute to be set to it's type", function() {
    var form = schema.validate({input: 'username'});

    expect(form.valid).to.be.ok;
    expect(form.data.input).to.equal('username');
  });

  it("should allow an attribute to be set to null", function() {
    var form = schema.validate({input: null});

    expect(form.valid).to.be.ok;
    expect(form.data.input).to.equal(null);
  });

  it("should be valid but not include an attribute if it is not included", function() {
    var form = schema.validate({});

    expect(form.valid).to.be.ok;
    expect(form.data.input).to.eql(undefined);
  });

  it("should not validate if the attribute is a number", function() {
    var form = schema.validate({input: 6});
    expect(form.valid).to.not.be.ok;
  });


});
