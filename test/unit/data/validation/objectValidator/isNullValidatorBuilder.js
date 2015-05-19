describe("IsNullBuilder", function () {
    it("should return true when target is null", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsNull:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsNull.Message);
        assert.equal(validator.property, meta.IsNull.Property);
    });
});