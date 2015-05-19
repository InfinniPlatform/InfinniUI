describe("AndValidatorBuilder", function () {
    it("should build", function () {
        // Given

        var factory = new createValidationBuilderFactory();

        var meta = {
            And: {
                Property: "Property1",
                Operators: [
                    {
                        IsMoreThan: {
                            Message: "Message1",
                            Value: 0
                        }
                    },
                    {
                        IsLessThan: {
                            Message: "Message2",
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
        assert.equal(validator.property, meta.And.Property);
        assert.equal(validator.operators.length, 2);
        assert.equal(validator.operators[0].message, meta.And.Operators[0].IsMoreThan.Message);
        assert.equal(validator.operators[1].message, meta.And.Operators[1].IsLessThan.Message);
    });
});