describe("validationMethods", function () {
    describe("generalValidate", function () {

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

        it("should build validation result when fail", function () {
            for (var c = 0; c < propertyTestCase.length; ++c) {
                // Given
                var validator = new FalseValidator();
                validator.property = propertyTestCase[c].property;
                validator.message = "Error";

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

        it("should build validation result when success", function () {
            for (var c = 0; c < propertyTestCase.length; ++c) {
                // Given
                var validator = new TrueValidator();
                validator.property = propertyTestCase[c].property;
                validator.message = "Error";

                // When
                var result = { };
                var isValid = validator.validate(propertyTestCase[c].parent, { }, result);

                // Then
                assert.isTrue(isValid);
                assert.isTrue(result.IsValid);
                assert.isTrue(result.Items === null || result.Items === undefined || result.Items.length === 0);
            }
        });
    });

    describe("combinePropertyPath", function () {
        it("should build property path", function () {
            assert.equal(combinePropertyPath(null, null), "");
            assert.equal(combinePropertyPath(null, ""), "");
            assert.equal(combinePropertyPath("", null), "");
            assert.equal(combinePropertyPath("", ""), "");
            assert.equal(combinePropertyPath("Parent", null), "Parent");
            assert.equal(combinePropertyPath("Parent", ""), "Parent");
            assert.equal(combinePropertyPath(null, "Property"), "Property");
            assert.equal(combinePropertyPath("", "Property"), "Property");
            assert.equal(combinePropertyPath("Parent", "Property"), "Parent.Property");

            assert.equal(combinePropertyPath(null, 9), "9");
            assert.equal(combinePropertyPath("", 9), "9");
            assert.equal(combinePropertyPath("Parent", 9), "Parent.9");
            assert.equal(combinePropertyPath(9, null), "9");
            assert.equal(combinePropertyPath(9, ""), "9");
            assert.equal(combinePropertyPath(9, "Property"), "9.Property");
        });
    });
});