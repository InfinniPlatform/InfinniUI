describe("IsLessThanOrEqualValidator", function () {

    var failureTestCase =
        [
            { target: null, value: 123 },
            { target: 1234, value: 123 },
            { target: null, value: new Date(2014, 0, 1) },
            { target: new Date(2014, 0, 2), value: new Date(2014, 0, 1) },
            { target: null, value: "2014-01-01" },
            { target: new Date(2014, 0, 2), value: "2014-01-01" }
        ];

    var successTestCase =
        [
            { target: 123, value: 123 },
            { target: 123, value: 1234 },
            { target: new Date(2014, 0, 1), value: new Date(2014, 0, 1) },
            { target: new Date(2014, 0, 1), value: new Date(2014, 0, 2) }
            // Todo: { target: new Date(2014, 0, 1), value: "2014-01-01" },
            // Todo: { target: new Date(2014, 0, 1), value: "2014-01-02" }
        ];

    it("should validate when failure", function () {
        for (var c = 0; c < failureTestCase.length; ++c) {
            // Given
            var testCase = failureTestCase[c];
            var validator = new IsLessThanOrEqualValidator();
            validator.message = "Error";
            validator.value = testCase.value;

            // When
            var result = { };
            var isValid = validator.validate("", testCase.target, result);

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
            var testCase = successTestCase[c];
            var validator = new IsLessThanOrEqualValidator();
            validator.message = "Error";
            validator.value = testCase.value;

            // When
            var result = { };
            var isValid = validator.validate("", testCase.target, result);

            // Then
            assert.isTrue(isValid);
            assert.isTrue(result.IsValid);
            assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
        }
    });
});