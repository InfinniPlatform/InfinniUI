describe("OrValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            Or: {
                Property: "Property1",
                Operators: [
                    {
                        IsLessThan: {
                            Message: "Значение должно быть меньше 0",
                            Value: 0
                        }
                    },
                    {
                        IsMoreThan: {
                            Message: "Значение должно быть больше 3",
                            Value: 3
                        }
                    }
                ]
            }
        };

        // When
        var validator = factory.build(meta);

        // Then
        assert.isDefined(validator);
        assert.isNotNull(validator);
        assert.equal(validator.property, meta.Or.Property);
        assert.equal(validator.operators.length, 2);
        assert(validator.operators[0].message, meta.Or.Operators[0].IsLessThan.Message);
        assert(validator.operators[1].message, meta.Or.Operators[1].IsMoreThan.Message);
    });
});