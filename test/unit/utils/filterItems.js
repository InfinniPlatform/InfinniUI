describe("Filter items", function () {
    describe("Filter items", function () {
        it("FilterItems should filter by equality to field", function () {
            // Given
            var filter = 'eq(Id,1)';
            var items = [
                {Id: 1},
                {Id: 2},
                {Id: 3}
            ];

            // When
            var result1 = filterItems(items, filter);

            // Then
            assert.lengthOf(result1, 1, 'length of items after filtering is right');
            assert.equal(result1[0].Id, 1, 'right element is filtered');
        });


    });
});