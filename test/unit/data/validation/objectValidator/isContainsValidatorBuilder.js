describe("IsContainsBuilder", function() {
    it("should return true if target exist value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsContains:{
                Message: "Message1",
                Value: "Abc"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsContains.Message);
        assert.equal(validator.value, meta.IsContains.Value);
    });
});