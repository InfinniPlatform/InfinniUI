describe('ListEditorBase (Control)', function () {

    function applyViewMetadata(metadata, onViewReady){
        var linkView = new LinkView(null, function (resultCallback) {
            var builder = new ApplicationBuilder();
            var view = builder.buildType('View', metadata, {parentView: fakeView()});
            resultCallback(view);
        });
        linkView.setOpenMode('Application');

        var view = linkView.createView(function (view) {
            view.open();
            onViewReady(view, $('#sandbox').children());
        });
    }



    describe('ListBox as exemplar of ListEditorBase', function (){

        it('should apply value to control (single selecting mode)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": { "Id": 2, "Display": "2G" }}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                assert.lengthOf($chosen, 1, 'length of chosen item is right');
                assert.equal($items.index($chosen), 1, 'index of chosen item is right');
            }
        });


        it('should apply value to control (multiply selecting mode)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": [
                                    { "Id": 2, "Display": "2G" },
                                    {"Id": 3, "Display": "2G"}
                                ]}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "MultiSelect": true,
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };


            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                assert.lengthOf($chosen, 2, 'length of chosen item is right');
                assert.equal($items.index($chosen.eq(0)), 1, 'index of first chosen item is right');
                assert.equal($items.index($chosen.eq(1)), 2, 'index of second chosen item is right');
            }
        });

        it('should apply value from control (single selecting)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": null}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };



            // When
            applyViewMetadata(metadata, onViewReady);

            function onViewReady(view, $layout){
                $layout.detach();


                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                // Then
                assert.lengthOf($chosen, 0, 'length of chosen item is right');

                // When
                $items.first().find('.pl-listbox-input input').prop('checked', true).change();
                $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');

                // Then
                assert.lengthOf($chosen, 1, 'length of chosen item is right');
                assert.equal($items.index($chosen.eq(0)), 0, 'index of first chosen item is right');
            }
        });

        it('should apply value from control (multiply selecting)', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": [{"Id": 2, "Display": "2G"}]}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "MultiSelect": true,
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };



            // When
            applyViewMetadata(metadata, onViewReady);

            function onViewReady(view, $layout){
                $layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen'),
                    value = view.getContext().dataSources['ObjectDataSource2'].getSelectedItem().Value;

                // Then
                assert.lengthOf($chosen, 1, 'length of chosen item is right');
                assert.equal($items.index($chosen.eq(0)), 1, 'index of chosen item is right');
                assert.lengthOf(value, 1, 'length value in DS is right');
                assert.equal(value[0].Id, 2, 'value in DS is right');

                // When
                $items.first().find('.pl-listbox-input input').prop('checked', true).change();
                $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');
                value = view.getContext().dataSources['ObjectDataSource2'].getSelectedItem().Value;

                assert.lengthOf($chosen, 2, 'length of chosen item is right');
                assert.equal($items.index($chosen.eq(0)), 0, 'index of first chosen item is right');
                assert.equal($items.index($chosen.eq(1)), 1, 'index of second chosen item is right');

                assert.lengthOf(value, 2, 'length value in DS is right');
                assert.equal(value[0].Id, 1, 'first value in DS is right');
                assert.equal(value[1].Id, 2, 'second value in DS is right');
            }
        });

        it('should bind selectedItem and value', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {"Id": 1, "Display": "LTE"},
                                {"Id": 2, "Display": "2G"},
                                {"Id": 3, "Display": "2G"}
                            ]
                        }
                    },{
                        ObjectDataSource: {
                            "Name": "ObjectDataSource2",
                            "Items": [
                                { "Value": {"Id": 2, "Display": "2G"}}
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
                        },
                        "Value": {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource2",
                                "Property": "$.Value"
                            }
                        }
                    }
                }]
            };



            // When
            applyViewMetadata(metadata, onViewReady);

            function onViewReady(view, $layout){
                //$layout.detach();

                var $items = $layout.find('.pl-listbox-i'),
                    $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen'),
                    $selected = $layout.find('.pl-listbox-i.pl-listbox-i-selected'),
                    ds = view.getContext().dataSources['ObjectDataSource1'],
                    ds2 = view.getContext().dataSources['ObjectDataSource2'],
                    selectedItem = ds.getSelectedItem(),
                    items = ds.getItems();

                // Then
                assert.lengthOf($chosen, 1, 'length of chosen item is right');
                assert.lengthOf($selected, 1, 'length of selected item is right');
                assert.equal($items.index($chosen), $items.index($selected), 'index of chosen and selected is equal');
                assert.equal(selectedItem.Id, 2, 'value in DS is right');
                assert.equal(ds2.getProperty('Value.Id'), 2, 'selected item in DS is right');

                // When
                $items.last().find('.pl-listbox-input input').prop('checked', true).change();
                $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');
                $selected = $layout.find('.pl-listbox-i.pl-listbox-i-selected');
                selectedItem = ds.getSelectedItem();

                // Then
                assert.lengthOf($chosen, 1, 'length of chosen item is right (after changing)');
                assert.lengthOf($selected, 1, 'length of selected item is right (after changing)');
                assert.equal($items.index($chosen), $items.index($selected), 'index of chosen and selected is equal (after changing)');
                assert.equal(selectedItem.Id, 3, 'value in DS is right (after changing)');
                assert.equal(ds2.getProperty('Value.Id'), 3, 'selected item in DS is right (after changing)');

                // When
                ds.setSelectedItem(items[0]);
                $chosen = $layout.find('.pl-listbox-i.pl-listbox-i-chosen');
                $selected = $layout.find('.pl-listbox-i.pl-listbox-i-selected');
                selectedItem = ds.getSelectedItem();

                // Then
                assert.lengthOf($chosen, 1, 'length of chosen item is right (after 2 changing)');
                assert.lengthOf($selected, 1, 'length of selected item is right (after 2 changing)');
                assert.equal($items.index($chosen), $items.index($selected), 'index of chosen and selected is equal (after 2 changing)');
                assert.equal(selectedItem.Id, 1, 'value in DS is right (after 2 changing)');
                assert.equal(ds2.getProperty('Value.Id'), 1, 'selected item in DS is right (after 2 changing)');
            }
        });
    });


});