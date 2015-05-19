describe("IsEndsWithBuilder", function() {
    it("should return true if target ends with value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsEndsWith:{
                Message: "Message1",
                Value: "Abc"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsEndsWith.Message);
        assert.equal(validator.value, meta.IsEndsWith.Value);
    });
});