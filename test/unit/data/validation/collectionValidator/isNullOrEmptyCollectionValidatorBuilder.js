describe("IsNullOrEmptyCollectionValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            IsNullOrEmptyCollection: {
                Message: "Message1"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.isDefined(validator);
        assert.isNotNull(validator);
        assert.equal(validator.message, meta.IsNullOrEmptyCollection.Message);
    });
});	