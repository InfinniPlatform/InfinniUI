describe("IsAbsoluteUriBuilder", function(){
    it("should return true when collection exist value", function(){
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsAbsoluteUri:{
                Property: "Property1",
                Message: "Message1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsAbsoluteUri.Message);
        assert.equal(validator.property, meta.IsAbsoluteUri.Property);
    });
});