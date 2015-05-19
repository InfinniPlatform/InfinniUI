describe("IsEqualBuilder", function () {
    it("should return true when target is equal value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsEqual:{
                Message: "Message1",
                Value: 1234
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsEqual.Message);
        assert.equal(validator.value, meta.IsEqual.Value);
    });
});