describe("IsRegexBuilder", function() {
    it("should return true if target ends with value", function () {
        // Given
        var factory = new createValidationBuilderFactory();

        var meta = {
            IsRegex:{
                Message: "Message1",
                Pattern: "[0-9]+"
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.equal(validator.message, meta.IsRegex.Message);
        assert.equal(validator.pattern, meta.IsRegex.Pattern);
    });
});
