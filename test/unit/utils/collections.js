describe("Collection", function () {

    var items;
    var objects;
    var itemsCollections;
    var objectsCollections;
    var idProperty = 'id';



    function bindAllEvents(collection) {
        var events = 'onAdd,onReplace,onRemove,onMove,onReset,onChange'.split(',');
        var handlers = [];

        events.forEach(function (event) {

            collection[event](function (context, argument) {
                handlers.push(event);
            });
        });

        return {
            checkEvent: function (event, count) {
                if (typeof count === 'undefined') {
                    count = 1;
                }
                return handlers.filter(function (name) {
                    return name === event;
                }).length === count;
            },
            reset: function () {
                handlers = [];
            }
        }
    }

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
            return new InfinniUI.Collection(items);
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
            return new InfinniUI.Collection(objects, idProperty);
        });
    });

    describe("length", function () {

        it("should return 0", function () {
            // When
            var collection = new InfinniUI.Collection();
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

    describe("idProperty", function () {
        it("should return undefined", function () {
            // When
            var collection = new InfinniUI.Collection();
            // Then
            assert.isUndefined(collection.idProperty);
        });

        it("should return idProperty", function () {
            // When
            var collection = new InfinniUI.Collection([], idProperty);
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
                collection = new InfinniUI.Collection([], null, comparator);

            assert.isFunction(collection.comparator);
            assert.equal(collection.comparator, comparator);
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


    describe("push()", function () {
        it("should add item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.push('A');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.push('B');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.push('C');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B","C"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
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
                collection = new InfinniUI.Collection([], idProperty),
                handlers = bindAllEvents(collection);

            changed = collection.push(objects[0]);
            assert.isTrue(changed, 'One changed');
            assert.equal(String(collection), '{"id":1,"title":"One"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.push(objects[1]);
            assert.isTrue(changed, 'Two changed');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.push(objects[2]);
            assert.isTrue(changed, 'Three changed');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
        });

    });

    describe("add()", function () {
        it("should add item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.add('A');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.add('B');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.add('C');
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B","C"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
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
                collection = new InfinniUI.Collection([], idProperty),
                handlers = bindAllEvents(collection);

            changed = collection.add(objects[0]);
            assert.isTrue(changed, 'One changed');
            assert.equal(String(collection), '{"id":1,"title":"One"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.add(objects[1]);
            assert.isTrue(changed, 'Two changed');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.add(objects[2]);
            assert.isTrue(changed, 'Three changed');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
        });
    });

    describe("addAll()", function () {
        it("should add all item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.addAll(['A', 'B']);
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.addAll(['C', 'D']);
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B","C","D"');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
        });

        it("should add all objects", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection([], 'id'),
                handlers = bindAllEvents(collection);

            changed = collection.addAll([{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed);
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));

            handlers.reset();
            changed = collection.addAll([{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed);
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"},{"id":3,"title":"Three"},{"id":4,"title":"Four"}');
            assert.isTrue(handlers.checkEvent('onAdd'));
            assert.isTrue(handlers.checkEvent('onChange'));
        });
    });

    describe("insert()", function () {
        it("should insert item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.insert(0, 'A');
            assert.isTrue(changed, 'Changed on insert "A"');
            assert.equal(String(collection), '"A"');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insert(0, 'B');
            assert.isTrue(changed, 'Changed on insert "B"');
            assert.equal(String(collection), '"B","A"');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insert(0, 'C');
            assert.isTrue(changed, 'Changed on insert "C"');
            assert.equal(String(collection), '"C","B","A"');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should insert objects", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection([], idProperty),
                handlers = bindAllEvents(collection);

            changed = collection.insert(0, {id: 1, title: 'One'});
            assert.isTrue(changed, 'One changed');
            assert.equal(String(collection), '{"id":1,"title":"One"}');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insert(0, {id: 2, title: 'Two'});
            assert.isTrue(changed, 'Two changed');
            assert.equal(String(collection), '{"id":2,"title":"Two"},{"id":1,"title":"One"}');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insert(0, {id: 3, title: 'Three'});
            assert.isTrue(changed, 'Three changed');
            assert.equal(String(collection), '{"id":3,"title":"Three"},{"id":2,"title":"Two"},{"id":1,"title":"One"}');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });
    });

    describe("insertAll()", function () {

        it("should insert all item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.insertAll(0, ['A', 'B']);
            assert.isTrue(changed, 'Changed on insert ["A", "B"]');
            assert.equal(String(collection), '"A","B"');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insertAll(0, ['C', 'D']);
            assert.isTrue(changed, 'Changed on insert ["C", "D"');
            assert.equal(String(collection), '"C","D","A","B"');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should insert all objects", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection([], 'id'),
                handlers = bindAllEvents(collection);

            changed = collection.insertAll(0, [{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed, 'Changed step 1');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.insertAll(0, [{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed, 'Changed step 2');
            assert.equal(String(collection), '{"id":3,"title":"Three"},{"id":4,"title":"Four"},{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onAdd'), 'onAdd event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });
    });

    describe("reset()", function () {

        it("should reset item", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection(),
                handlers = bindAllEvents(collection);

            changed = collection.reset(['A', 'B']);
            assert.isTrue(changed, 'Changed on step 1');
            assert.equal(String(collection), '"A","B"');
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.reset(['C', 'D']);
            assert.isTrue(changed, 'Changed on step 2');
            assert.equal(String(collection), '"C","D"');
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.reset(['C', 'D']);
            assert.isFalse(changed, 'Not changed on step 3');
            assert.equal(String(collection), '"C","D"');
            assert.isFalse(handlers.checkEvent('onReset'), 'onReset event');
            assert.isFalse(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should reset objects", function () {
            //When
            var
                changed,
                collection = new InfinniUI.Collection([], 'id'),
                handlers = bindAllEvents(collection);

            changed = collection.reset([{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
            assert.isTrue(changed, 'Changed step 1');
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":2,"title":"Two"}');
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.reset([{id: 3, title: 'Three'}, {id: 4, title: 'Four'}]);
            assert.isTrue(changed, 'Changed step 2');
            assert.equal(String(collection), '{"id":3,"title":"Three"},{"id":4,"title":"Four"}');
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

    });

    describe("set()", function () {
        it("should set items", function () {
            var collection = new InfinniUI.Collection(['Apple', 'Banana', 'Pineapple']),
                handlers = bindAllEvents(collection);

            assert.deepEqual(collection.toArray(), ['Apple', 'Banana', 'Pineapple']);

            collection.set(['Apple', 'Melon']);

            assert.deepEqual(collection.toArray(), ['Apple', 'Melon']);
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should set objects", function () {
            var collection = new InfinniUI.Collection([
                {key: 1, value: 'Apple'},
                {key: 2, value: 'Banana'},
                {key: 3, value: 'Pineapple'}
            ], 'key'),
                handlers = bindAllEvents(collection);

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
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

    });

    describe("replace()", function () {
        it("should replace item", function () {
            //When
            var collection = new InfinniUI.Collection(['A', 'B', 'C']);
            var handlers = bindAllEvents(collection);

            var changed = collection.replace('C', 'D');
            //Then
            assert.isTrue(changed);
            assert.equal(String(collection), '"A","B","D"');
            assert.isTrue(handlers.checkEvent('onReplace'), 'onReplace event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should replace object", function () {
            //When
            var collection = new InfinniUI.Collection([{id: 1, title: "A"}, {id: 2, title: "B"}], 'id');
            var handlers = bindAllEvents(collection);
            var changed = collection.replace({id: 2, title: "B"}, {id: 3, title: "C"});

            assert.isTrue(changed);
            assert.equal(String(collection), '{"id":1,"title":"A"},{"id":3,"title":"C"}');
            assert.isTrue(handlers.checkEvent('onReplace'), 'onReplace event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        })
    });

    describe("pop()", function () {

        it("should pop item", function () {
            //When
            var items = ['A', 'B', 'C'],
                collection = new InfinniUI.Collection(['A', 'B', 'C']),
                handlers = bindAllEvents(collection);

            var item2 = collection.pop(); // 'C'
            var item1 = collection.pop(); // 'B'
            var item0 = collection.pop(); // 'A

            //Then
            assert.equal(item2, items[2]);
            assert.equal(item1, items[1]);
            assert.equal(item0, items[0]);
            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

        it("should pop object", function () {
            //When
            var objects = [
                    {id: 1, title: 'One'},
                    {id: 2, title: 'Two'},
                    {id: 3, title: 'Three'}
                ],
                collection = new InfinniUI.Collection(objects, 'id');

            //Then
            while (collection.length > 0) {
                assert.equal(collection.pop(), objects.pop());
            }
        });

    });

    describe("remove()", function () {

        it("should remove item", function () {
            var
                collection = new InfinniUI.Collection(['A', 'B', 'C']),
                handlers = bindAllEvents(collection),
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

            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

        it("should remove object", function () {
            var collection = new InfinniUI.Collection([
                {id: 1, title: "One"},
                {id: 2, title: "Two"},
                {id: 3, title: "Three"}
            ], 'id'), change,
                handlers = bindAllEvents(collection);

            change = collection.remove({id: 2, title: "Two"});
            assert.isTrue(change);
            assert.equal(String(collection), '{"id":1,"title":"One"},{"id":3,"title":"Three"}');

            change = collection.remove({id: 1, title: "One"});
            assert.isTrue(change);
            assert.equal(String(collection), '{"id":3,"title":"Three"}');

            change = collection.remove({id: 3, title: "Three"});
            assert.isTrue(change);
            assert.equal(collection.length, 0);

            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

    });

    describe("removeById()", function () {

        it("should remove object by id", function () {
            var collection = new InfinniUI.Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key'),
                handlers = bindAllEvents(collection),
                changed;

            changed = collection.removeById(2);
            assert.equal(String(collection), '{"key":1,"value":"A"},{"key":3,"value":"C"}');
            assert.isTrue(changed, 'deleted 2');

            changed = collection.removeById(1);
            assert.equal(String(collection), '{"key":3,"value":"C"}');
            assert.isTrue(changed, 'deleted 1');

            changed = collection.removeById(3);
            assert.equal(collection.length, 0);
            assert.isTrue(changed, 'deleted 3');

            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

    });

    describe("removeAt()", function () {

        it("should remove item by index", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C']),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.removeAt(1));
            assert.deepEqual(collection.toArray(), ['A', 'C']);

            assert.isTrue(collection.removeAt(0));
            assert.deepEqual(collection.toArray(), ['C']);

            assert.isTrue(collection.removeAt(0));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

        it("should remove object by index", function () {
            var collection = new InfinniUI.Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'}
            ], 'key'),
                handlers = bindAllEvents(collection),
                changed;

            assert.isTrue(collection.removeAt(1));
            assert.deepEqual(collection.toArray(), [
                {key: 1, value: 'A'},
                {key: 3, value: 'C'}
            ]);

            assert.isTrue(collection.removeAt(0));
            assert.deepEqual(collection.toArray(), [
                {key: 3, value: 'C'}
            ]);

            assert.isTrue(collection.removeAt(0));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 3), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 3), 'onChange event');
        });

    });

    describe("removeAll()", function () {
        it("should remove all item", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C', 'D']),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.removeAll(['A', 'C']));
            assert.deepEqual(collection.toArray(), ['B', 'D']);

            assert.isTrue(collection.removeAll(['B', 'D']));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 2), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 2), 'onChange event');
        });

        it("should remove all objects", function () {
            var collection = new InfinniUI.Collection([
                {key: 1, value: 'A'},
                {key: 2, value: 'B'},
                {key: 3, value: 'C'},
                {key: 4, value: 'D'}
            ], 'key'),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.removeAll([
                {key: 1, value: 'A'},
                {key: 3, value: 'C'}]));

            assert.deepEqual(collection.toArray(), [
                {key: 2, value: 'B'},
                {key: 4, value: 'D'}]);

            assert.isTrue(collection.removeAll([
                {key: 2, value: 'B'},
                {key: 4, value: 'D'}]));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 2), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 2), 'onChange event');
        });
    });

    describe("removeRange", function () {

        it("should remove range items", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C', 'D']),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.removeRange(1, 2));
            assert.deepEqual(collection.toArray(), ['A', 'D']);

            assert.isTrue(collection.removeRange(0));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 2), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 2), 'onChange event');
        });

        it("should remove range items", function () {
            var collection = new InfinniUI.Collection([
                null,
                null,
                {key: 1, value: 'A'}, {key: 2, value: 'B'}
            ], 'key'),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.removeRange(1, 2));
            assert.deepEqual(collection.toArray(), [null, {key: 2, value: 'B'}]);

            assert.isTrue(collection.removeRange(0));
            assert.deepEqual(collection.toArray(), []);

            assert.isTrue(handlers.checkEvent('onRemove', 2), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange', 2), 'onChange event');
        });

    });

    describe("removeEvery()", function () {

        it("should remove every item", function () {
            var
                changed,
                collection = new InfinniUI.Collection([1, 10, 2, 20, 3, 30]),
                handlers = bindAllEvents(collection);

            changed = collection.removeEvery(function (item, index, collection) {
                return item >= 10;
            });
            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [1, 2, 3]);
            assert.isTrue(handlers.checkEvent('onRemove'), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should remove every object", function () {
            var changed,
                collection = new InfinniUI.Collection([
                    null,
                    null,
                    {key: 1, value: 'A'},
                    {key: 2, value: 'B'},
                    {key: 3, value: 'A'}
                ], 'key'),
                handlers = bindAllEvents(collection);

            changed = collection.removeEvery(function (item, index, collection) {
                return item && item.key % 2 === 1;
            });

            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [
                null,
                null,
                {key: 2, value: 'B'}
            ]);
            assert.isTrue(handlers.checkEvent('onRemove'), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            changed = collection.removeEvery(function (item, index, collection) {
                return item === null;
            });

            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [
                {key: 2, value: 'B'}
            ]);
            assert.isTrue(handlers.checkEvent('onRemove'), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });
    });

    describe("clear()", function () {
        it("should clear collection", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C']),
                handlers = bindAllEvents(collection);

            assert.isTrue(collection.clear());
            assert.equal(collection.length, 0);
            assert.isTrue(handlers.checkEvent('onRemove'), 'onRemove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });
    });

    describe("getById()", function () {

        it("should get object by id", function () {
            var objects = [
                    {key: 1, value: 'A'},
                    {key: 2, value: 'B'},
                    {key: 3, value: 'C'}
                ],
                collection = new InfinniUI.Collection(objects, 'key');

            assert.equal(collection.getById(1), objects[0]);
            assert.equal(collection.getById(2), objects[1]);
            assert.equal(collection.getById(3), objects[2]);
        });

        it("should return undefined on missing id", function () {
            var objects = [
                    {key: 1, value: 'A'},
                    {key: 2, value: 'B'},
                    {key: 3, value: 'C'}
                ],
                collection = new InfinniUI.Collection(objects, 'key');

            assert.isTrue(typeof collection.getById(4) === 'undefined');
        });
    });

    describe("getByIndex()", function () {
        it("should return item by index", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C']);

            assert.equal(collection.getByIndex(0), 'A');
            assert.equal(collection.getByIndex(1), 'B');
            assert.equal(collection.getByIndex(2), 'C');
        });
    });

    describe("find()", function () {

        it("should return item", function () {
            //When
            var collection = new InfinniUI.Collection([1, 3, 5, 6, 7, 9, 11, 12]);
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
                collection = new InfinniUI.Collection(objects, 'key');
            //Then
            var item = collection.find(function (item, index, collection) {
                return item.key % 2 === 0;
            });
            assert.equal(item, objects[3]);
        });

    });

    describe("indexOf()", function () {

        it("should return index of item", function () {
            //When
            var collection = new InfinniUI.Collection(['A', 'B', 'C', 'A', 'B', 'C']);
            //Then
            assert.equal(collection.indexOf('C'), 2);
            assert.equal(collection.indexOf('C', 3), 5);
            assert.equal(collection.indexOf('D'), -1);
        });

        it("should return index of object", function () {
            //When
            var collection = new InfinniUI.Collection([
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
            var collection = new InfinniUI.Collection(['A', 'B', 'C', 'A', 'B', 'C']);
            //Then
            assert.equal(collection.lastIndexOf('C'), 5);
            assert.equal(collection.lastIndexOf('C', 4), 2);
            assert.equal(collection.lastIndexOf('D'), -1);
        });

        it("should return last index of object", function () {
            //When
            var collection = new InfinniUI.Collection([
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
            var collection = new InfinniUI.Collection([1, 3, 5, 6, 7, 9, 11, 12]);
            //Then
            var index = collection.findIndex(function (item, index, collection) {
                return item % 2 === 0;
            });
            assert.equal(index, 3);
        });

        it("should return index of object", function () {
            //When
            var collection = new InfinniUI.Collection([
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

    describe("contains()", function () {

        it("should check item in collection", function () {
            //When
            var collection = new InfinniUI.Collection(['A', 'B', 'C']);
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
            var collection = new InfinniUI.Collection([
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

            assert.isFalse(new InfinniUI.Collection([12, 5, 8, 130, 44]).every(isBigEnough));
            assert.isTrue(new InfinniUI.Collection([12, 54, 18, 130, 44]).every(isBigEnough));
        });

        it("should check every object", function () {
            var isBigEnough = function (item, index, collection) {
                return item.value >= 10;
            };

            assert.isFalse(new InfinniUI.Collection([
                {id: 1, value: 12},
                {id: 2, value: 5},
                {id: 3, value: 8},
                {id: 4, value: 130},
                {id: 5, value: 44}]).every(isBigEnough));

            assert.isTrue(new InfinniUI.Collection([
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

            assert.isFalse(new InfinniUI.Collection([2, 5, 8, 1, 4]).some(isBiggerThan10));
            assert.isTrue(new InfinniUI.Collection([12, 5, 8, 1, 4]).some(isBiggerThan10));
        });

        it("should check some object", function () {
            function isBiggerThan10(item, index, collection) {
                return item.value > 10;
            }

            assert.isFalse(new InfinniUI.Collection([
                {id: 1, value: 2},
                {id: 2, value: 5},
                {id: 3, value: 8},
                {id: 4, value: 1},
                {id: 5, value: 4}]).some(isBiggerThan10));
            assert.isTrue(new InfinniUI.Collection([
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
            var collection = new InfinniUI.Collection(objects);
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
            var collection = new InfinniUI.Collection([12, 5, 8, 130, 44]);
            //Then
            assert.deepEqual(collection.filter(isBigEnough), [12, 130, 44]);
        });

    });

    describe("take()", function () {
        it("should return items", function () {
            //When
            var collection = new InfinniUI.Collection(['A', 'B', 'C', 'D']);
            //Then
            assert.deepEqual(collection.take(1, 2), ['B', 'C']);
            assert.deepEqual(collection.take(2), ['C', 'D']);
        });
    });

    describe("toArray()", function () {

        it("should return items", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C']);
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

    describe("move()", function () {

        it("should move items", function () {
            var collection = new InfinniUI.Collection(['A', 'B', 'C']),
                handlers = bindAllEvents(collection);

            collection.move(2, 0);
            assert.deepEqual(collection.toArray(), ['C', 'A', 'B']);
            assert.isTrue(handlers.checkEvent('onMove'), 'onMove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');

            handlers.reset();
            collection.move(2, 1);
            assert.deepEqual(collection.toArray(), ['C', 'B', 'A']);
            assert.isTrue(handlers.checkEvent('onMove'), 'onMove event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });
    });

    describe("sort()", function () {

        it("should sort items", function () {
            var collection = new InfinniUI.Collection([3, 30, 2, 20, 1, 10]),
                handlers = bindAllEvents(collection),
                comparator = function (a, b) {
                    return a - b
                };

            var changed = collection.sort(comparator);

            assert.isTrue(changed);
            assert.deepEqual(collection.toArray(), [1, 2, 3, 10, 20, 30]);
            assert.isTrue(handlers.checkEvent('onReset'), 'onReset event');
            assert.isTrue(handlers.checkEvent('onChange'), 'onChange event');
        });

        it("should sort items", function () {
            var collection = new InfinniUI.Collection([
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
            var collection1 = new InfinniUI.Collection(['A', 'B', 'C']);
            var collection2 = collection1.clone();

            collection1.add('X');
            collection2.add('Y');

            assert.deepEqual(collection1.toArray(), ['A', 'B', 'C', 'X']);
            assert.deepEqual(collection2.toArray(), ['A', 'B', 'C', 'Y']);
        });
    });

    describe('Custom properties', function () {

        it ('should set property', function () {
            // Given
            var collection = new InfinniUI.Collection([3,2,1]);
            collection
                .setProperty(0, 'name', 'three')
                .setProperty(1, 'name', 'two')
                .setProperty(2, 'name', 'one');

            // When
            collection.sort();

            // Then
            assert.deepEqual(collection.toArray(), [1, 2, 3]);
            assert.equal(collection.getProperty(0, 'name'), 'one');
            assert.equal(collection.getProperty(1, 'name'), 'two');
            assert.equal(collection.getProperty(2, 'name'), 'three');
        });

    });

    describe("Events", function () {
        var
            collection,
            events = 'onAdd,onReplace,onRemove,onMove,onReset,onChange'.split(','),
            handlers,
            bindEvents = function () {
                handlers = [];

                events.forEach(function (event) {

                    collection[event](function (context, argument) {
                        handlers.push(event);
                    });
                });
            }


        describe("Collection.onAdd", function () {
            it("should raise onAdd & onChange event", function () {
                //when
                collection = new InfinniUI.Collection();
                bindEvents();
                collection.add('A');
                //then
                assert.equal("onAdd,onChange", handlers.join(','));
            });
        });

        describe("Collection.onReplace", function () {
            it("should raise onReplace & onChange event", function () {
                //when
                collection = new InfinniUI.Collection(['A']);
                bindEvents();
                collection.replace('A', 'B');
                //then
                assert.equal("onReplace,onChange", handlers.join(','));
                assert.deepEqual(collection.toArray(), ['B']);
            });
        });

        describe("Collection.onRemove", function () {
            it("should raise onRemove & onChange event", function () {
                //when
                collection = new InfinniUI.Collection(['A']);
                bindEvents();
                collection.remove('A');
                //then
                assert.equal("onRemove,onChange", handlers.join(','));
                assert.deepEqual(collection.toArray(), []);
            });
        });

        describe("Collection.onMove", function () {
            it("should raise onMove & onChange event", function () {
                //when
                collection = new InfinniUI.Collection(['A', 'B']);
                bindEvents();
                collection.move(1, 0);
                //then
                assert.equal("onMove,onChange", handlers.join(','));
                assert.deepEqual(collection.toArray(), ['B', 'A']);
            });
        });

        describe("Collection.onReset", function () {
            it("should raise onReset & onChange event", function () {
                //when
                collection = new InfinniUI.Collection();
                bindEvents();
                collection.reset(['A', 'B']);
                //then
                assert.equal("onReset,onChange", handlers.join(','));
                assert.deepEqual(collection.toArray(), ['A', 'B']);
            });
        });

        describe("Collection.onChange", function () {
            it("should raise onChange event on setElements", function () {
                //when
                collection = new InfinniUI.Collection();
                bindEvents();
                collection.set(['A', 'B']);
                //then
                assert.equal("onReset,onChange", handlers.join(','));
                assert.deepEqual(collection.toArray(), ['A', 'B']);
            });
        });
    })


});



