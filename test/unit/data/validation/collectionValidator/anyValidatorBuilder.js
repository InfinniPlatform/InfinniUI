describe("AnyValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            Any: {
                Operator: {
                    IsLessThan: {
                        Property: "LessThanProperty1",
                        Message: "LessThanMessage1",
                        Value: 3
                    }
                }
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.isDefined(validator);
        assert.isNotNull(validator);
        assert.equal(validator.operator.value, 3);
        assert.equal(validator.operator.property, meta.Any.Operator.IsLessThan.Property);
        assert.equal(validator.operator.message, meta.Any.Operator.IsLessThan.Message);
    });
});