describe("Collection", function () {

    var items;
    var objects;
    var itemsCollections;
    var objectsCollections;
    var idProperty = 'id';

    function getArray(length, value) {
        value = value || null;

        switch (length) {
            case 0:
                return [];
            case 1:
                return [null];
            default:
                return Array(length).join(',').split(',').map(function () {
                    return value;
                });
        }
    }


    beforeEach(function () {
        var COUNT = 5;

        items = [];
        for (var i = 0; i < COUNT; i = i + 1) {
            items.push(getArray(i).map(function (itm, idx) {
                return 'Item ' + idx;
            }));
        }
        itemsCollections = items.map(function (items) {
            return new Collection(items);
        });
    });

    beforeEach(function () {
        var COUNT = 5;

        objects = [];
        for (var i = 0; i < COUNT; i = i + 1) {
            objects.push(getArray(i).map(function (itm, idx) {
                return {id: idx + 1, title: idx};
            }));
        }
        objectsCollections = objects.map(function (objects) {
            return new Collection(objects, idProperty);
        });
    });

    describe("length", function () {

        it("should return 0", function () {
            // When
            var collection = new Collection();
            // Then
            assert.strictEqual(collection.length, 0);
        });

        it("should return length items collection", function () {
            // When
            // Then
            for (var i = 0; i < itemsCollections.length; i++) {
                assert.strictEqual(itemsCollections[i].length, items[i].length);
            }
        });

        it("should return length objects collection", function () {
            // When
            // Then
            for (var i = 0; i < objectsCollections.length; i++) {
                assert.strictEqual(objectsCollections[i].length, objects[i].length);
            }
        });

    });

    describe("size()", function () {
        it("should return size items collection", function () {
            // When
            // Then
            for (var i = 0; i < itemsCollections.length; i++) {
                assert.strictEqual(itemsCollections[i].size(), items[i].length);
            }
        });

        it("should return size objects collection", function () {
            // When
            // Then
            for (var i = 0; i < objectsCollections.length; i++) {
                assert.strictEqual(objectsCollections[i].size(), objects[i].length);
            }
        });
    });

    describe("idProperty", function () {
        it("should return undefined", function () {
            // When
            var collection = new Collection();
            // Then
            assert.isUndefined(collection.idProperty);
        });

        it("should return idProperty", function () {
            // When
            var collection = new Collection([], idProperty);
            // Then
            assert.equal(collection.idProperty, idProperty);
        });

    });

    describe("comparator", function () {
        it("should has comparator", function () {
            var
                comparator = function (a, b) {
                    return a - b
                },
                collection = new Collection([], null, comparator);

            assert.isFunction(collection.comparator);
            assert.equal(collection.comparator, comparator);
        });
    });


    describe("push()", function () {
        it("should add item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.push('A');
            assert.isTrue(changed);
            assert.equal('"A"', String(collection));


            changed = collection.push('B');
            assert.isTrue(changed);
            assert.equal('"A","B"', String(collection));


            changed = collection.push('C');
            assert.isTrue(changed);
            assert.equal('"A","B","C"', String(collection));
        });

        it("should add objects", function () {
            //When
            var
                objects = [
                    {id: 1, title: 'One'},
                    {id: 2, title: 'Two'},
                    {id: 3, title: 'Three'}
                ],
                changed,
                collection = new Collection([], idProperty);

            changed = collection.push(objects[0]);
            assert.isTrue(changed, 'One changed');
            assert.equal('{"id":1,"title":"One"}', String(collection));


            changed = collection.push(objects[1]);
            assert.isTrue(changed, 'Two changed');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.push(objects[2]);
            assert.isTrue(changed, 'Three changed');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"}', String(collection));
        });

    });

    describe("add()", function () {
        it("should add item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.add('A');
            assert.isTrue(changed);
            assert.equal('"A"', String(collection));


            changed = collection.add('B');
            assert.isTrue(changed);
            assert.equal('"A","B"', String(collection));


            changed = collection.add('C');
            assert.isTrue(changed);
            assert.equal('"A","B","C"', String(collection));
        });

        it("should add objects", function () {
            //When
            var
                objects = [
                    {id: 1, title: 'One'},
                    {id: 2, title: 'Two'},
                    {id: 3, title: 'Three'}
                ],
                changed,
                collection = new Collection([], idProperty);

            changed = collection.add(objects[0]);
            assert.isTrue(changed, 'One changed');
            assert.equal('{"id":1,"title":"One"}', String(collection));


            changed = collection.add(objects[1]);
            assert.isTrue(changed, 'Two changed');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.add(objects[2]);
            assert.isTrue(changed, 'Three changed');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"}', String(collection));
        });
    });

    describe("addAll()", function () {
        it("should add all item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.addAll(['A', 'B']);
            assert.isTrue(changed);
            assert.equal('"A","B"', String(collection));


            changed = collection.addAll(['C', 'D']);
            assert.isTrue(changed);
            assert.equal('"A","B","C","D"', String(collection));
        });

        it("should add all objects", function () {
            //When
            var
                changed,
                collection = new Collection([], 'id');

            changed = collection.addAll([{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed);
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.addAll([{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed);
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"},{"id":4,"title":"Four"}', String(collection));
        });
    });

    describe("insert()", function () {
        it("should insert item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.insert(0, 'A');
            assert.isTrue(changed, 'Changed on insert "A"');
            assert.equal('"A"', String(collection));


            changed = collection.insert(0, 'B');
            assert.isTrue(changed, 'Changed on insert "B"');
            assert.equal('"B","A"', String(collection));


            changed = collection.insert(0, 'C');
            assert.isTrue(changed, 'Changed on insert "C"');
            assert.equal('"C","B","A"', String(collection));
        });

        it("should insert objects", function () {
            //When
            var
                changed,
                collection = new Collection([], idProperty);

            changed = collection.insert(0, {id: 1, title: 'One'});
            assert.isTrue(changed, 'One changed');
            assert.equal('{"id":1,"title":"One"}', String(collection));


            changed = collection.insert(0, {id: 2, title: 'Two'});
            assert.isTrue(changed, 'Two changed');
            assert.equal('{"id":2,"title":"Two"},{"id":1,"title":"One"}', String(collection));


            changed = collection.insert(0, {id: 3, title: 'Three'});
            assert.isTrue(changed, 'Three changed');
            assert.equal('{"id":3,"title":"Three"},{"id":2,"title":"Two"},{"id":1,"title":"One"}', String(collection));
        });
    });

    describe("insertAll()", function () {

        it("should insert all item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.insertAll(0, ['A', 'B']);
            assert.isTrue(changed, 'Changed on insert ["A", "B"]');
            assert.equal('"A","B"', String(collection));


            changed = collection.insertAll(0, ['C', 'D']);
            assert.isTrue(changed, 'Changed on insert ["C", "D"');
            assert.equal('"C","D","A","B"', String(collection));
        });

        it("should insert all objects", function () {
            //When
            var
                changed,
                collection = new Collection([], 'id');

            changed = collection.insertAll(0, [{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed, 'Changed step 1');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.insertAll(0, [{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed, 'Changed step 2');
            assert.equal('{"id":3,"title":"Three"},{"id":4,"title":"Four"},{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));

        });
    });

    describe("reset()", function () {

        it("should reset item", function () {
            //When
            var
                changed,
                collection = new Collection();

            changed = collection.reset(['A', 'B']);
            assert.isTrue(changed, 'Changed on step 1');
            assert.equal('"A","B"', String(collection));


            changed = collection.reset(['C', 'D']);
            assert.isTrue(changed, 'Changed on step 2');
            assert.equal('"C","D"', String(collection));

            changed = collection.reset(['C', 'D']);
            assert.isFalse(changed, 'Not changed on step 3');
            assert.equal('"C","D"', String(collection));
        });

        it("should reset objects", function () {
            //When
            var
                changed,
                collection = new Collection([], 'id');

            changed = collection.reset([{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed, 'Changed step 1');
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.reset([{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed, 'Changed step 2');
            assert.equal('{"id":3,"title":"Three"},{"id":4,"title":"Four"}', String(collection));

        });

    });

    describe("set()", function () {
        it("should set items", function () {
            var collection = new Collection(['Apple', 'Banana', 'Pineapple']);

            assert.deepEqual(collection.toArray(), ['Apple', 'Banana', 'Pineapple']);

            collection.set(['Apple', 'Melon']);

            assert.deepEqual(collection.toArray(), ['Apple', 'Melon']);
        });

        it("should set objects", function () {
            var collection = new Collection([
                {key: 1, value: 'Apple'},
                {key: 2, value: 'Banana'},
                {key: 3, value: 'Pineapple'}
            ], 'key');

            assert.deepEqual(collection.toArray().map(function (item) {
                return item.value;
            }), ['Apple', 'Banana', 'Pineapple']);

            collection.set([
                {key: 1, value: 'Apple'},
                {key: 2, value: 'Melon'}
            ]);

            assert.deepEqual(collection.toArray().map(function (item) {
                return item.value;
            }), ['Apple', 'Melon']);
        });

    });

    describe("replace()", function () {
        it("should replace item", function () {
            //When
            var collection = new Collection(['A', 'B', 'C']);
            var changed = collection.replace('C', 'D');
            //Then
            assert.isTrue(changed);
            assert.equal('"A","B","D"', String(collection));
        });

        it("should replace object", function () {
            //When
            var collection = new Collection([{id: 1, title: "A"}, {id: 2, title: "B"}], 'id');
            var changed = collection.replace({id: 2, title: "B"}, {id: 3, title: "C"});

            assert.isTrue(changed);
            assert.equal('{"id":1,"title":"A"},{"id":3,"title":"C"}', String(collection));
        })
    });

    describe("pop()", function () {

        it("should pop item", function () {
            //When
            var items = ['A', 'B', 'C'],
                collection = new Collection(['A', 'B', 'C']);
            var item2 = collection.pop(); // 'C'
            var item1 = collection.pop(); // 'B'
            var item0 = collection.pop(); // 'A
            //Then
            assert.equal(item2, items[2]);
            assert.equal(item1, items[1]);
            assert.equal(item0, items[0]);
        });

        it("should pop object", function () {
            //When
            var objects = [
                    {id: 1, title: 'One'},
                    {id: 2, title: 'Two'},
                    {id: 3, title: 'Three'}
                ],
                collection = new Collection(objects, 'id');

            //Then
            while (collection.length > 0) {
                assert.equal(collection.pop(), objects.pop());
            }
        });

    });

    describe("remove()", function () {

        it("should remove item", function () {
            var
                collection = new Collection(['A', 'B', 'C']),
                change;

            change = collection.remove('B'); // [ 'A', 'C' ]
            assert.equal('"A","C"', String(collection));
            assert.isTrue(change);

            change = collection.remove('A'); // [ 'C' ]
            assert.equal('"C"', String(collection));
            assert.isTrue(change);

            change = collection.remove('C'); // [ ]
            assert.equal(collection.length, 0);
            assert.isTrue(change);
        });

        it("should remove object", function () {
            var collection = new Collection([
                {id: 1, title: "One"},
                {id: 2, title: "Two"},
                {id: 3, title: "Three"}
            ], 'id'), change;

            change = collection.remove({id: 2, title: "Two"});
            assert.isTrue(change);
            assert.equal('{"id":1,"title":"One"},{"id":3,"title":"Three"}', String(collection));

            change = collection.remove({id: 1, title: "One"});
            assert.isTrue(change);
            assert.equal('{"id":3,"title":"Three"}', String(collection));

            change = collection.remove({id: 3, title: "Three"});
            assert.isTrue(change);
            assert.equal(collection.length, 0);

        });

    });

    describe("removeById()", function () {

        it("should remove object by id", function () {
            var collection = new Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key'), changed;

            changed = collection.removeById(2);
            assert.equal('{"key":1,"value":"A"},{"key":3,"value":"C"}', String(collection));
            assert.isTrue(changed, 'deleted 2');

            changed = collection.removeById(1);
            assert.equal('{"key":3,"value":"C"}', String(collection));
            assert.isTrue(changed, 'deleted 1');

            changed = collection.removeById(3);
            assert.equal(collection.length, 0);
            assert.isTrue(changed, 'deleted 3');
        });

    });

    describe("getById()", function () {

        it("should get object by id", function () {
            var objects = [
                    {key: 1, value: 'A'},
                    {key: 2, value: 'B'},
                    {key: 3, value: 'C'}
                ],
                collection = new Collection(objects, 'key');

            assert.equal(collection.getById(1), objects[0]);
            assert.equal(collection.getById(2), objects[1]);
            assert.equal(collection.getById(3), objects[2]);
        });
    });

    describe("getByIndex()", function () {
        it("should return item by index", function () {
            var collection = new Collection(['A', 'B', 'C']);

            assert.equal(collection.getByIndex(0), 'A');
            assert.equal(collection.getByIndex(1), 'B');
            assert.equal(collection.getByIndex(2), 'C');
        });
    });

    describe("indexOf()", function () {

        it("should return index of item", function () {
            //When
            var collection = new Collection(['A', 'B', 'C', 'A', 'B', 'C']);
            //Then
            assert.equal(collection.indexOf('C'), 2);
            assert.equal(collection.indexOf('C', 3), 5);
            assert.equal(collection.indexOf('D'), -1);
        });

        it("should return index of object", function () {
            //When
            var collection = new Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'},
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key');

            //Then
            assert.equal(collection.indexOf({key: 3, value: 'C'}), 2);
            assert.equal(collection.indexOf({key: 3, value: 'C'}, 3), 5);
            assert.equal(collection.indexOf({key: 4, value: 'D'}), -1);
        })

    });

    describe("lastIndexOf()", function () {

        it("should return last index of item", function () {
            //When
            var collection = new Collection(['A', 'B', 'C', 'A', 'B', 'C']);
            //Then
            assert.equal(collection.lastIndexOf('C'), 5);
            assert.equal(collection.lastIndexOf('C', 4), 2);
            assert.equal(collection.lastIndexOf('D'), -1);
        });

        it("should return last index of object", function () {
            //When
            var collection = new Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'},
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key');
            //Then
            assert.equal(collection.lastIndexOf({key: 3, value: 'C'}), 5);
            assert.equal(collection.lastIndexOf({key: 3, value: 'C'}, 4), 2);
            assert.equal(collection.lastIndexOf({key: 4, value: 'D'}), -1);
        });
    });

    describe("findIndex()", function () {

        it("should return index of item", function () {
            //When
            var collection = new Collection([1, 3, 5, 6, 7, 9, 11, 12]);
            //Then
            var index = collection.findIndex(function (item, index, collection) {
                return item % 2 === 0;
            });
            assert.equal(index, 3);
        });

        it("should return index of object", function () {
            //When
            var collection = new Collection([
                {key: 1, value: 'A'},
                {key: 3, value: 'B'},
                {key: 5, value: 'C'},
                {key: 6, value: 'A'},
                {key: 7, value: 'B'},
                {key: 9, value: 'C'},
                {key: 11, value: 'B'},
                {key: 12, value: 'C'}
            ], 'key');
            //Then
            var index = collection.findIndex(function (item, index, collection) {
                return item.key % 2 === 0;
            });
            assert.equal(index, 3);
        });

    });

    describe("find()", function () {

        it("should return item", function () {
            //When
            var collection = new Collection([1, 3, 5, 6, 7, 9, 11, 12]);
            //Then
            var item = collection.find(function (item, index, collection) {
                return item % 2 === 0;
            });
            assert.equal(item, 6);
        });

        it("should return object", function () {
            //When
            var objects = [
                    {key: 1, value: 'A'},
                    {key: 3, value: 'B'},
                    {key: 5, value: 'C'},
                    {key: 6, value: 'A'},
                    {key: 7, value: 'B'},
                    {key: 9, value: 'C'},
                    {key: 11, value: 'B'},
                    {key: 12, value: 'C'}
                ],
                collection = new Collection(objects, 'key');
            //Then
            var item = collection.find(function (item, index, collection) {
                return item.key % 2 === 0;
            });
            assert.equal(item, objects[3]);
        });

    });

    describe("contains()", function () {

        it("should check item in collection", function () {
            //When
            var collection = new Collection(['A', 'B', 'C']);
            //Then
            assert.isTrue(collection.contains('A'), 'A');
            assert.isTrue(collection.contains('B'), 'B');
            assert.isTrue(collection.contains('C'), 'C');
            assert.isFalse(collection.contains('A', 1), 'A');
            assert.isFalse(collection.contains('B', 2), 'B');
            assert.isFalse(collection.contains('C', 3), 'C');
        });

        it("should check object in collection", function () {
            //When
            var collection = new Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key');
            //Then
            assert.isTrue(collection.contains({key: 1, value: 'A'}), 'contains A');
            assert.isTrue(collection.contains({key: 2, value: 'B'}), 'contains B');
            assert.isTrue(collection.contains({key: 3, value: 'C'}), 'contains C');
            assert.isFalse(collection.contains({key: 1, value: 'A'}, 1), '!contains A');
            assert.isFalse(collection.contains({key: 2, value: 'B'}, 2), '!contains B');
            assert.isFalse(collection.contains({key: 3, value: 'C'}, 3), '!contains C');
        });
    });

    describe("every()", function () {

        it("should check every item", function () {
            var isBigEnough = function (item, index, collection) {
                return item >= 10;
            };

            assert.isFalse(new Collection([12, 5, 8, 130, 44]).every(isBigEnough));
            assert.isTrue(new Collection([12, 54, 18, 130, 44]).every(isBigEnough));
        });

        it("should check every object", function () {
            var isBigEnough = function (item, index, collection) {
                return item.value >= 10;
            };

            assert.isFalse(new Collection([
                {id: 1, value: 12},
                {id: 2, value: 5},
                {id: 3, value: 8},
                {id: 4, value: 130},
                {id: 5, value: 44}]).every(isBigEnough));

            assert.isTrue(new Collection([
                {id: 1, value: 12},
                {id: 2, value: 54},
                {id: 3, value: 18},
                {id: 4, value: 130},
                {id: 5, value: 44}]).every(isBigEnough));
        });
    });

    describe("some()", function () {

        it("should check some item", function () {
            function isBiggerThan10(item, index, collection) {
                return item > 10;
            }

            assert.isFalse(new Collection([2, 5, 8, 1, 4]).some(isBiggerThan10));
            assert.isTrue(new Collection([12, 5, 8, 1, 4]).some(isBiggerThan10));
        });

        it("should check some object", function () {
            function isBiggerThan10(item, index, collection) {
                return item.value > 10;
            }

            assert.isFalse(new Collection([
                {id: 1, value: 2},
                {id: 2, value: 5},
                {id: 3, value: 8},
                {id: 4, value: 1},
                {id: 5, value: 4}]).some(isBiggerThan10));
            assert.isTrue(new Collection([
                {id: 1, value: 12},
                {id: 2, value: 5},
                {id: 3, value: 8},
                {id: 4, value: 1},
                {id: 5, value: 4}]).some(isBiggerThan10));
        });

    });

    describe("forEach()", function () {

        it("should call for each item", function () {
            //When
            var objects = ['A', 'B', 'C'];
            var collection = new Collection(objects);
            var result = [];
            collection.forEach(function (item, index, collection) {
                result.push(item);
            });
            //Then
            assert.deepEqual(result, objects);
        });

    });

    describe("filter()", function () {

        it("should filter items", function () {
            //When
            var isBigEnough = function (item, index, collection) {
                return item >= 10;
            };
            var collection = new Collection([12, 5, 8, 130, 44]);
            //Then
            assert.deepEqual(collection.filter(isBigEnough), [12, 130, 44]);
        });

    });

    describe("take()", function () {
        it("should return items", function () {
            //When
            var collection = new Collection(['A', 'B', 'C', 'D']);
            //Then
            assert.deepEqual(collection.take(1, 2), ['B', 'C']);
            assert.deepEqual(collection.take(2), ['C', 'D']);
        });
    });

    describe("toArray()", function () {

        it("should return items", function () {
            var collection = new Collection(['A', 'B', 'C']);
            var array = collection.toArray();

            collection.push('X');
            array.push('Y');

            var items = [];
            collection.forEach(function (item) {
                items.push(item);
            });
            assert.deepEqual(items, ['A', 'B', 'C', 'X']);
            assert.deepEqual(array, ['A', 'B', 'C', 'Y']);
        });
    });

    describe("sort()", function () {

        it("should sort items", function () {
            var collection = new Collection([3, 30, 2, 20, 1, 10]),
                comparator = function (a, b) {
                    return a - b
                };

            var changed = collection.sort(comparator);

            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [1, 2, 3, 10, 20, 30]);
        });

        it("should sort items", function () {
            var collection = new Collection([
                    {value: 3, title: "3"},
                    {value: 30, title: "30"},
                    {value: 2, title: "2"},
                    {value: 20, title: "20"},
                    {value: 1, title: "1"},
                    {value: 10, title: "10"}], 'value'),
                comparator = function (a, b) {
                    return a.value - b.value;
                };

            var changed = collection.sort(comparator);

            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [
                {value: 1, title: "1"},
                {value: 2, title: "2"},
                {value: 3, title: "3"},
                {value: 10, title: "10"},
                {value: 20, title: "20"},
                {value: 30, title: "30"}]);
        });

    });

    describe("clone()", function () {

        it("should clone collection", function () {
            var collection1 = new Collection(['A', 'B', 'C']);
            var collection2 = collection1.clone();

            collection1.add('X');
            collection2.add('Y');

            assert.deepEqual(collection1.toArray(), ['A', 'B', 'C', 'X']);
            assert.deepEqual(collection2.toArray(), ['A', 'B', 'C', 'Y']);
        });
    });


});