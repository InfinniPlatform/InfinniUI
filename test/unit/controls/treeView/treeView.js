describe('TreeView', function () {
    describe('build', function () {

        it('Build tree', function () {
            // Given
            var metadata = {
                "KeyProperty": "Id",
                "ParentProperty": "ParentId",
                "ItemFormat": {
                    "ObjectFormat": {
                        "Format": "{Id:n3}_{DisplayName}"
                    }
                },
                "ValueProperty": "CardNumber",
                "ReadOnly": false,
                "MultiSelect": true
            };
            var builder = new TreeViewBuilder();
            var tree = builder.build(new ApplicationBuilder(), null, metadata);
            tree.render();

            //When
            var items = [{id:1, text: 2}, {id: 3, text:4}, {id:5, text: 6}];
            var value = [{Id: 1}, {Id: 5}];
            tree.setItems(items);
            tree.setValue(value);

            //Then
            assert.deepEqual(tree.getItems(), items);
            assert.deepEqual(tree.getValue(), value);
        });

    });

});