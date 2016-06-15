describe('LabelBuilder', function () {
    describe('build', function () {
        it('successful build Label', function () {
            // Given

            var metadata = {};

            // When
            var builder = new LabelBuilder();
            var element = builder.build(null, {builder: new ApplicationBuilder(), view: new View(), metadata: metadata});

            // Then
            assert.isNotNull(element);
            assert.isObject(element);
        });

        it('dataBinding should update display value', function () {
            // Given

            var metadata = {
                "DataSources": [
                    {
                        "ObjectDataSource": {
                            "Name": "ObjectDataSource",
                            "IsLazy": false,
                            "Items": []
                        }
                    }
                ],
                "Items": [{
                    Label: {
                        Name: "Label1",
                        DisplayFormat: "некоторый текст {property}",
                        Value: {
                            Source: "ObjectDataSource",
                            Property: "$"
                        }
                    }
                }]
            };

            testHelper.applyViewMetadata(metadata, function(view){
                var label = view.context.controls["Label1"];
                var ds = view.context.dataSources["ObjectDataSource"];

                ds.createItem();

                var item = ds.getSelectedItem();
                item.property = "123";
                ds.setProperty("$", { property: "123" });

                assert.equal(label.getDisplayValue(), "некоторый текст 123");
                assert.equal(label.control.controlView.$el.html(), "некоторый текст 123");

                view.close();
            });
        });

        it('dataBinding should update display value - 2', function () {
            // Given

            var metadata = {
                "DataSources": [
                    {
                        "ObjectDataSource": {
                            "Name": "ObjectDataSource",
                            "IsLazy": false,
                            "Items": [{
                                property: "old"
                            }]
                        }
                    }
                ],
                "Items": [{
                    Label: {
                        Name: "Label1",
                        DisplayFormat: "некоторый текст {property}",
                        Value: {
                            Source: "ObjectDataSource",
                            Property: "$"
                        }
                    }
                }]
            };

            testHelper.applyViewMetadata(metadata, function(view){
                var label = view.context.controls["Label1"];
                var ds = view.context.dataSources["ObjectDataSource"];

                ds.setProperty("$", { property: "new" });

                assert.equal(label.getDisplayValue(), "некоторый текст new");
                assert.equal(label.control.controlView.$el.html(), "некоторый текст new");

                view.close();
            });
        });
    });
});
