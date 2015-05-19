describe("IsUriBuilder", function(){
    it("should return true if target is Uri", function(){
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsUri:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsUri.Message);
        assert.equal(validator.property, meta.IsUri.Property);
    });
});