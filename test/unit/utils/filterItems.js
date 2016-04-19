describe("Filter items", function () {
	describe("Filter items", function () {
		it("FilterItems should return all items that have given param", function () {
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
			assert.lengthOf(result1, 1, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
		});

		it("FilterItems should return items that have all given params", function () {
			// Given
			var filter = 'and(eq(Id,1),eq(index,2))';
			var items = [
				{Id: 1, index: 2},
				{Id: 2, index: 2},
				{Id: 3}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 1, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
			assert.equal(result1[0].index, 2, 'filtered item is correct');
		});

		it("FilterItems should return all items that have at least one of given params", function () {
			// Given
			var filter = 'or(eq(Id,1),eq(Id,3))';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 2, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
			assert.equal(result1[1].Id, 3, 'filtered item is correct');
		});

		it("FilterItems should return all items but not given item(s)", function () {
			// Given
			var filter = 'not(eq(Id,3))';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 2, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
			assert.equal(result1[1].Id, 2, 'filtered item is correct');
		});

		it("FilterItems should return all items accept given item(s)", function () {
			// Given
			var filter = 'notEq(Id,2)';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 2, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
			assert.equal(result1[1].Id, 3, 'filtered item is correct');
		});

		it("FilterItems should return all items that have value of given param greater then given value", function () {
			// Given
			var filter = 'gt(Id,2)';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3},
				{Id: 4},
				{Id: 5}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 3, 'length of filtered items is right');
			assert.equal(result1[0].Id, 3, 'filtered item is correct');
			assert.equal(result1[1].Id, 4, 'filtered item is correct');
			assert.equal(result1[2].Id, 5, 'filtered item is correct');
		});

		it("FilterItems should return all items that have value of given param greater then given value or equal to it", function () {
			// Given
			var filter = 'gte(Id,3)';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3},
				{Id: 4},
				{Id: 5}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 3, 'length of filtered items is right');
			assert.equal(result1[0].Id, 3, 'filtered item is correct');
			assert.equal(result1[1].Id, 4, 'filtered item is correct');
			assert.equal(result1[2].Id, 5, 'filtered item is correct');
		});

		it("FilterItems should return all items that have value of given param lower then given value", function () {
			// Given
			var filter = 'lt(Id,2)';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3},
				{Id: 4},
				{Id: 5}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 1, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
		});

		it("FilterItems should return all items that have value of given param lower then given value or equal to it", function () {
			// Given
			var filter = 'lte(Id,3)';
			var items = [
				{Id: 1},
				{Id: 2},
				{Id: 3},
				{Id: 4},
				{Id: 5}
			];

			// When
			var result1 = filterItems(items, filter);

			// Then
			assert.lengthOf(result1, 3, 'length of filtered items is right');
			assert.equal(result1[0].Id, 1, 'filtered item is correct');
			assert.equal(result1[1].Id, 2, 'filtered item is correct');
			assert.equal(result1[2].Id, 3, 'filtered item is correct');
		});

	});
});