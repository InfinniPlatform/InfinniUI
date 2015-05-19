describe("IsInBuilder", function () {
    it("should return true if Items exist target", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsIn:{
                Message: "Message1",
                Property: "Property1",
                Items: [ 1, 2, 3 ]
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.items.length, 3);
        assert.equal(validator.message, meta.IsIn.Message);
        assert.equal(validator.property, meta.IsIn.Property);
    });
});