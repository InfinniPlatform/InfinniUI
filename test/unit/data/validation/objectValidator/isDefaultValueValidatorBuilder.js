describe("IsDefaultValueBuilder", function () {
    it("should return true when target is default", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsDefaultValue:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsDefaultValue.Message);
        assert.equal(validator.property, meta.IsDefaultValue.Property);
    });
});