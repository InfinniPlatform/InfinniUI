describe("ObjectUtils", function () {
    describe("getPropertyValue", function () {
        it("should return null when target is null or undefined", function () {
            // When
            var result1 = InfinniUI.ObjectUtils.getPropertyValue(null, "Property1");
            var result2 = InfinniUI.ObjectUtils.getPropertyValue(undefined, "Property1");

            // Then
            assert.isNull(result1);
            assert.isNull(result2);
        });

        it("should return null when property is not exists", function () {
            // Given
            var target = { };

            // When
            var result = InfinniUI.ObjectUtils.getPropertyValue(target, "NotExistsProperty");

            // Then
            assert.isNull(result);
        });

        it("should return collection item when target is collection", function () {
            // Given
            var target = [ 11, 22, 33 ];

            // When
            var item0 = InfinniUI.ObjectUtils.getPropertyValue(target, "0");
            var item1 = InfinniUI.ObjectUtils.getPropertyValue(target, "1");
            var item2 = InfinniUI.ObjectUtils.getPropertyValue(target, "2");
            var item3 = InfinniUI.ObjectUtils.getPropertyValue(target, "3");

            // Then
            assert.equal(item0, 11);
            assert.equal(item1, 22);
            assert.equal(item2, 33);
            assert.isNull(item3);
        });

        it("should return property value", function () {
            // Given
            var value = { };
            var target = { Property1: value };

            // When
            var result = InfinniUI.ObjectUtils.getPropertyValue(target, "Property1");

            // Then
            assert.equal(result, value);
        });

        it("should return nested property value", function () {
            // Given
            var value = { };
            var target = { Property1: { Property2: value } };

            // When
            var result = InfinniUI.ObjectUtils.getPropertyValue(target, "Property1.Property2");

            // Then
            assert.equal(result, value);
        });

        it("should return property value of specified collection item", function () {
            // Given
            var target = {
                Collection1: [
                    { Property1: 11 },
                    { Property1: 22 },
                    { Property1: 33 }
                ]
            };

            // When
            var item0 = InfinniUI.ObjectUtils.getPropertyValue(target, "Collection1.0.Property1");
            var item1 = InfinniUI.ObjectUtils.getPropertyValue(target, "Collection1.1.Property1");
            var item2 = InfinniUI.ObjectUtils.getPropertyValue(target, "Collection1.2.Property1");
            var item3 = InfinniUI.ObjectUtils.getPropertyValue(target, "Collection1.3.Property1");

            // Then
            assert.equal(item0, 11);
            assert.equal(item1, 22);
            assert.equal(item2, 33);
            assert.isNull(item3);
        });
    });

    describe("setPropertyValue", function () {
        it("should not throw exception when target is null or undefined", function () {
            InfinniUI.ObjectUtils.setPropertyValue(null, "property1", { });
            InfinniUI.ObjectUtils.setPropertyValue(undefined, "property1", { });
        });

        it("should set property value", function () {
            // Given
            var target = { property1: 123 };
            var propertyValue = 321;

            // When
            InfinniUI.ObjectUtils.setPropertyValue(target, "property1", propertyValue);

            // Then
            assert.equal(target.property1, propertyValue);
        });

        it("should set nested property value", function () {
            // Given
            var target = { property1: { property2: 123 } };
            var propertyValue = 321;

            // When
            InfinniUI.ObjectUtils.setPropertyValue(target, "property1.property2", propertyValue);

            // Then
            assert.equal(target.property1.property2, propertyValue);
        });

        it("should create all not exists properties in path", function () {
            // Given
            var target = { };
            var propertyValue = { };

            // When
            InfinniUI.ObjectUtils.setPropertyValue(target, "property1.property2.property3", propertyValue);

            // Then
            assert.equal(target.property1.property2.property3, propertyValue);
        });

        it("should replace collection item when target is collection", function () {
            // Given
            var target = [ 11, 0, 33 ];

            // When
            InfinniUI.ObjectUtils.setPropertyValue(target, "1", 22);

            // Then
            assert.equal(target.length, 3);
            assert.equal(target[0], 11);
            assert.equal(target[1], 22);
            assert.equal(target[2], 33);
        });

        it("should set property of specified collection item", function () {
            // Given
            var target = { collection1: [ { property1: 11 }, { property1: 0 }, { property1: 33 } ] };

            // When
            InfinniUI.ObjectUtils.setPropertyValue(target, "collection1.1.property1", 22);

            // Then
            assert.equal(target.collection1.length, 3);
            assert.equal(target.collection1[0].property1, 11);
            assert.equal(target.collection1[1].property1, 22);
            assert.equal(target.collection1[2].property1, 33);
        });
    });
});