describe("NotValidator", function () {
    it("should validate when failure", function () {
        // Given
        var validator = new NotValidator();
        validator.operator = new TrueValidator();
        validator.message = "Error";

        // When
        var result = { };
        var isValid = validator.validate("", { }, result);

        // Then
        assert.isFalse(isValid);
        assert.isFalse(result.IsValid);
        assert.isTrue(result.Items !== null && result.Items !== undefined && result.Items.length === 1);
        assert.equal(validator.message, result.Items[0].Message);
    });

    it("should validate when success", function () {
        // Given
        var validator = new NotValidator();
        validator.operator = new FalseValidator();
        validator.message = "Error";

        // When
        var result = { };
        var isValid = validator.validate("", { }, result);

        // Then
        assert.isTrue(isValid);
        assert.isTrue(result.IsValid);
        assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
    });
});