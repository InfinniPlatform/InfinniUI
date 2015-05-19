describe("IsStartsWithBuilder", function() {
    it("should return true if target begin with value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsStartsWith:{
                Message: "Message1",
                Value: "Abc"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsStartsWith.Message);
        assert.equal(validator.value, meta.IsStartsWith.Value);
    });
});