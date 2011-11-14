var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;

var schemajs = require('../schema');

test("test minimum string length", function (t) {
    var schema = schemajs.create({
        username : { type : 'string', properties : { min : 2 } },
    });

    var user1 = schema.validate({
        username : 'username',
    });
    t.ok(user1.valid, 'user1a has valid username length')

    var user2 = schema.validate({
        username : 'a',
    });
    t.ok(!user2.valid, 'user2 has invalid username length (too short)')

    var user3 = schema.validate({
        username : 'ab',
    });
    t.ok(user3.valid, 'user3 has valid username length (same as min)')

    var user4 = schema.validate({});
    t.ok(user4.valid, 'user4 has no username (so checking does not happen and therefore it is valid)')

    t.end();
});

test("test maximum string length", function (t) {
    var schema = schemajs.create({
        username : { type : 'string', properties : { max : 16 } },
    });

    var user1 = schema.validate({
        username : 'username',
    });
    t.ok(user1.valid, 'user1a has valid username length')

    var user2 = schema.validate({
        username : '01234567890abcdefg',
    });
    t.ok(!user2.valid, 'user2 has invalid username length (too long)')

    var user3 = schema.validate({
        username : '0123456789abcdef',
    });
    t.ok(user3.valid, 'user3 has valid username length (same as max)')

    var user4 = schema.validate({});
    t.ok(user4.valid, 'user4 has no username (so checking does not happen and therefore it is valid)')

    t.end();
});
