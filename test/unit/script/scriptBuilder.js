describe('ScriptExecutor', function () {
    var builder;
    beforeEach(function () {
        builder = new ScriptBuilder();
    });

    it('should build script handler', function () {

        var metadata = {
            Name: "Name",
            Body: "return 5;"
        };

        var func = builder.build(null, {metadata: metadata});

        assert.equal(func.call(), 5);
    });

    it('should pass arguments to handler', function () {

        var metadata = {
            Name: "Name",
            Body: "return [context,args].join(':');"
        };

        var func = builder.build(null, {metadata: metadata});

        assert.equal(func.call(undefined, "Context", "Args"), "Context:Args");
    });
});