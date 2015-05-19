describe("IsContainsCollectionValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            IsContainsCollection: {
                Message: "Message1",
                Value: 1234
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.isDefined(validator);
        assert.isNotNull(validator);
        assert.equal(validator.value, meta.IsContainsCollection.Value);
        assert.equal(validator.message, meta.IsContainsCollection.Message);
    });
});	