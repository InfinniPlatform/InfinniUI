describe("AndValidator", function () {

    var falseValidator = new FalseValidator();

    var trueValidator = new TrueValidator();

    var failureTestCase =
        [
            [ falseValidator ],
            [ falseValidator, falseValidator ],
            [ falseValidator, trueValidator ],
            [ trueValidator, falseValidator ],
            [ falseValidator, falseValidator, falseValidator ],
            [ falseValidator, falseValidator, trueValidator ],
            [ falseValidator, trueValidator, falseValidator ],
            [ falseValidator, trueValidator, trueValidator ],
            [ trueValidator, falseValidator, falseValidator ],
            [ trueValidator, falseValidator, trueValidator ],
            [ trueValidator, trueValidator, falseValidator ]
        ];

    var successTestCase =
        [
            [],
            [ trueValidator ],
            [ trueValidator, trueValidator ],
            [ trueValidator, trueValidator, trueValidator ]
        ];

    var propertyTestCase =
        [
            { parent: null, property: null, expected: "" },
            { parent: null, property: "", expected: "" },
            { parent: "", property: null, expected: "" },
            { parent: "", property: "", expected: "" },
            { parent: "Parent", property: null, expected: "Parent" },
            { parent: "Parent", property: "", expected: "Parent" },
            { parent: null, property: "Property", expected: "Property" },
            { parent: "", property: "Property", expected: "Property" },
            { parent: "Parent", property: "Property", expected: "Parent.Property" }
        ];

    it("should validate when failure", function () {
        for (var c = 0; c < failureTestCase.length; ++c) {

            // Given

            var validator = new AndValidator();
            validator.operators = failureTestCase[c];

            var falseOperatorCount = failureTestCase[c].filter(function (i) {
                return i === falseValidator
            }).length;

            // When
            var result = { };
            var isValid = validator.validate("", { }, result);

            // Then
            assert.isFalse(isValid);
            assert.isFalse(result.IsValid);
            assert.isNotNull(result.Items);
            assert.isDefined(result.Items);
            assert.equal(result.Items.length, falseOperatorCount);
        }
    });

    it("should validate when success", function () {
        for (var c = 0; c < successTestCase.length; ++c) {

            // Given

            var validator = new AndValidator();
            validator.operators = successTestCase[c];

            // When
            var result = { };
            var isValid = validator.validate("", { }, result);

            // Then
            assert.isTrue(isValid);
            assert.isTrue(result.IsValid);
            assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
        }
    });

    it("should build validation result", function () {
        for (var c = 0; c < propertyTestCase.length; ++c) {

            // Given
            var validator = new AndValidator();
            validator.property = propertyTestCase[c].property;
            validator.operators = [ falseValidator ];

            // When
            var result = { };
            var isValid = validator.validate(propertyTestCase[c].parent, { }, result);

            // Then
            assert.isFalse(isValid);
            assert.isFalse(result.IsValid);
            assert.isNotNull(result.Items);
            assert.isDefined(result.Items);
            assert.equal(result.Items.length, 1);
            assert.equal(result.Items[0].Property, propertyTestCase[c].expected);
        }
    });
});