describe("AnyValidator", function () {

    var testPredicate = function (i) {
        return i === 3;
    };

    var testValidator = new PredicateValidator();
    testValidator.message = "Error";
    testValidator.predicate = testPredicate;

    var failureTestCase =
        [
            [ ],
            [ 1 ],
            [ 1, 2 ]
        ];

    var successTestCase =
        [
            [ 1, 2, 3 ]
        ];

    it("should validate when failure", function () {
        for (var c = 0; c < failureTestCase.length; ++c) {

            // Given

            var target = failureTestCase[c];

            var validator = new AnyValidator();
            validator.operator = testValidator;

            var falseItemCount = target.filter(function (i) {
                return !testPredicate(i);
            }).length;

            // When
            var result = { };
            var isValid = validator.validate("", target, result);

            // Then
            assert.isFalse(isValid);
            assert.isFalse(result.IsValid);
            assert.isDefined(result.Items);
            assert.isNotNull(result.Items);
            assert.equal(result.Items.length, falseItemCount);
        }
    });

    it("should validate when success", function () {
        for (var c = 0; c < successTestCase.length; ++c) {

            // Given

            var target = successTestCase[c];

            var validator = new AnyValidator();
            validator.operator = testValidator;

            // When
            var result = { };
            var isValid = validator.validate("", target, result);

            // Then
            assert.isTrue(isValid);
            assert.isTrue(result.IsValid);
            assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
        }
    });

    it("should build validation result", function () {
        // Given
        var validator = new AnyValidator();
        validator.operator = testValidator;

        // When
        var result = { };
        var isValid = validator.validate("Collection1", [ 1, 2 ], result);

        // Then
        assert.isFalse(isValid);
        assert.isFalse(result.IsValid);
        assert.isDefined(result.Items);
        assert.isNotNull(result.Items);
        assert.equal(result.Items.length, 2);
        assert.equal(result.Items[0].Property, "Collection1.0");
        assert.equal(result.Items[1].Property, "Collection1.1");
        assert.equal(result.Items[0].Message, testValidator.message);
        assert.equal(result.Items[1].Message, testValidator.message);
    });
});