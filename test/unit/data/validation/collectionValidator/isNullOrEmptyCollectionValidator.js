describe("IsNullOrEmptyCollectionValidator", function () {

    var validator = new IsNullOrEmptyCollectionValidator();
    validator.message = "Error";

    var failureTestCase =
        [
            [ 1, 2, 3 ]
        ];

    var successTestCase =
        [
            null,
            []
        ];

    it("should validate when failure", function () {
        for (var c = 0; c < failureTestCase.length; ++c) {

            // Given
            var target = failureTestCase[c];

            // When
            var result = { };
            var isValid = validator.validate("", target, result);

            // Then
            assert.isFalse(isValid);
            assert.isFalse(result.IsValid);
            assert.isDefined(result.Items);
            assert.isNotNull(result.Items);
            assert.equal(result.Items.length, 1);
            assert.equal(result.Items[0].Message, validator.message);
        }
    });

    it("should validate when success", function () {
        for (var c = 0; c < successTestCase.length; ++c) {

            // Given
            var target = successTestCase[c];

            // When
            var result = { };
            var isValid = validator.validate("", target, result);

            // Then
            assert.isTrue(isValid);
            assert.isTrue(result.IsValid);
            assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
        }
    });
});