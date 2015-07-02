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

    //@TODO Comparator

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

            changed = collection.addAll([{id: 1, title: 'One'},{id: 2, title: 'Two'}]);
            assert.isTrue(changed);
            assert.equal('{"id":1,"title":"One"},{"id":2,"title":"Two"}', String(collection));


            changed = collection.addAll([{id: 3, title: 'Three'},{id: 4, title: 'Four'}]);
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

            changed = collection.insert(0,{id: 1, title: 'One'});
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

            changed = collection.insertAll(0,[{id: 1, title: 'One'}, {id: 2, title: 'Two'}]);
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

    describe("replace()", function () {
        //it("should replace item", function () {
        //    //When
        //    var collection = new Collection([ 'A', 'B', 'C' ]);
        //    var changed = collection.replace('C', 'D');
        //    //Then
        //    assert.isTrue(changed);
        //    assert.equal('"C","D"', String(collection));
        //});

        it("should replace object", function () {
            //When
            var collection = new Collection([{id: 1, title: "A"}, {id: 2, title: "B"}], 'id');
            var changed = collection.replace({id: 2, title: "B"}, {id: 3, title: "C"});

            assert.isTrue(changed);
            assert.equal('{"id":1,"title":"A"},{"id":3,"title":"C"}', String(collection));
        })
    });


});