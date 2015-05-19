describe("NotValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            Not: {
                Message: "Значение не может быть равно 1234",
                Property: "NotProperty1",
                Operator: {
                    IsEqual: {
                        Message: "IsEqual1",
                        Property: "IsEqualProperty1",
                        Value: 1234
                    }
                }
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.isDefined(validator);
        assert.isNotNull(validator);
        assert.equal(validator.message, meta.Not.Message);
        assert.equal(validator.property, meta.Not.Property);
        assert.equal(validator.operator.value, meta.Not.Operator.IsEqual.Value);
    });
});