describe("IsMoreThanOrEqualBuilder", function () {
    it("should return true if target >= value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsMoreThanOrEqual:{
                Message: "Message1",
                Value: 1234
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsMoreThanOrEqual.Message);
        assert.equal(validator.value, meta.IsMoreThanOrEqual.Value);
    });
});
