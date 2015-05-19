describe("IsNullOrEmptyBuilder", function(){
    it("should return true if target is Null or Empty", function(){
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsNullOrEmpty:{
                Message: "Message1",
                Property: "Property1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsNullOrEmpty.Message);
        assert.equal(validator.property, meta.IsNullOrEmpty.Property);
    });
});