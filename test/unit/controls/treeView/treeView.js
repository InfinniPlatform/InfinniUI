describe('TreeView', function () {

    var builder = new ApplicationBuilder();

    describe('render', function () {
        it('should apply value to control (single selecting mode)', function () {
            // Given
            var metadata = {
                "DataSources": [
                    {
                        "ObjectDataSource": {
                            "Name": "Geo",
                            "Items": [
                                {
                                    "Id": 1,
                                    "ParentId": null,
                                    "Name": "Челябинск"
                                },
                                {
                                    "Id": 2,
                                    "ParentId": 1,
                                    "Name": "Чичерина"
                                },
                                {
                                    "Id": 3,
                                    "ParentId": 1,
                                    "Name": "Комарова"
                                },
                                {
                                    "Id": 4,
                                    "ParentId": null,
                                    "Name": "Копейск"
                                },
                                {
                                    "Id": 5,
                                    "ParentId": 4,
                                    "Name": "Победы"
                                },
                                {
                                    "Id": 6,
                                    "ParentId": 5,
                                    "Name": "33/1"
                                }
                            ]
                        }
                    }
                ],
                "Items": [
                    {
                        "TreeView": {
                            "KeyProperty": "Id",
                            "ParentProperty": "ParentId",
                            "ItemProperty": "Name",
                            "ValueProperty": "Name",
                            "MultiSelect": true,
                            "Items": {
                                "Source": "Geo"
                            }
                        }
                    }
                ]
            };


            // When
            var linkView = (new InlineViewBuilder()).build(null, {builder: builder, metadata: {View: metadata}});


            var view = linkView.createView(function (view) {
                view.open();

                var $view = view.control.controlView.$el;
                var $treeView = $view.find('.pl-treeview');
                var $treeViewNodes = $treeView.find('.pl-treeview-node');
                //Then
                assert.equal($treeView.length, 1, 'TreeView rendered in View');
                assert.equal($treeViewNodes.length, 6, 'TreeViewNodes rendered');
            });

        });
    });

});