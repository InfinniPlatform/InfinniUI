describe("IsRelativeUriBuilder", function(){
    it("should return true if target is RelativeUri", function(){
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsRelativeUri:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsRelativeUri.Message);
        assert.equal(validator.property, meta.IsRelativeUri.Property);
    });
});