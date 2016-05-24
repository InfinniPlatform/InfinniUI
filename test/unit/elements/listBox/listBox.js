describe('ListBox', function () {

    describe('render', function () {

        it('should render listBox with grouping', function () {
            // Given

            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                { "Id": 1, "Display": "LTE", "Type": 1 },
                                { "Id": 2, "Display": "3G", "Type": 2 },
                                { "Id": 3, "Display": "2G", "Type": 2 }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Display"
                                }
                            }
                        },
                        "GroupItemTemplate": {
                            "Label": {
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Type"
                                }
                            }
                        },
                        "GroupValueProperty": "Type",
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onListboxReady);

            // Then
            function onListboxReady(view, $listbox){
                assert.lengthOf($listbox.find('.pl-listbox-body'), 3, 'length of rendered listbox');

                view.close();
            }
        });

        it('should render listBox without grouping', function () {
            // Given

            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                { "Id": 1, "Display": "LTE" },
                                { "Id": 2, "Display": "3G" },
                                { "Id": 3, "Display": "2G" }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Display"
                                }
                            }
                        },
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };

            // When

            testHelper.applyViewMetadata(metadata, onListboxReady);

            // Then
            function onListboxReady(view, $view){
                assert.lengthOf($view.find('.pl-listbox-body'), 3, 'length of rendered listbox');

                view.close();
            }
        });

    });

    describe('api', function () {
        it('should update DisabledItemCondition', function () {
            // Given
            var metadata = {
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                { "Id": 1, "Display": "LTE" },
                                { "Id": 2, "Display": "3G" },
                                { "Id": 3, "Display": "2G" }
                            ]
                        }
                    }
                ],
                Items: [{
                    ListBox: {
                        "Name": "ListBox1",
                        "DisabledItemCondition": "{ return (args.value.Id == 2); }",
                        "ItemTemplate": {
                            "Label": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "#.Display"
                                }
                            }
                        },
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };


            testHelper.applyViewMetadata(metadata, onViewReady);


            function onViewReady(view, $view) {
                var listbox = view.context.controls['ListBox1'];
                var items = $view.find('.pl-listbox-i');

                assert.isFalse(items.eq(0).hasClass('pl-disabled-list-item'), 'bad render for enabled item');
                assert.isTrue(items.eq(1).hasClass('pl-disabled-list-item'), 'bad render for disabled item');

                // When
                listbox.setDisabledItemCondition( function (context, args) {
                    return args.value.Id == 1;
                });

                // Then
                items = $view.find('.pl-listbox-i');

                assert.isTrue(items.eq(0).hasClass('pl-disabled-list-item'), 'items not updated');
                assert.isFalse(items.eq(1).hasClass('pl-disabled-list-item'), 'items not updated');
                view.close();
            }
        });
    });

});