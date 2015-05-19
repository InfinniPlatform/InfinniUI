describe("IsNullOrWhiteSpaceBuilder", function(){
    it("should return true if target is Null or Empty or WhiteSpace", function(){
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsNullOrWhiteSpace:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsNullOrWhiteSpace.Message);
        assert.equal(validator.property, meta.IsNullOrWhiteSpace.Property);
    });
});