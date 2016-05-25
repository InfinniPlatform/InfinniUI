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
                                { "Id": 2, "Display": "A", "Type": 2 },
                                { "Id": 3, "Display": "3G", "Type": 1 },
                                { "Id": 4, "Display": "01", "Type": 3 },
                                { "Id": 5, "Display": "2G", "Type": 1 },
                                { "Id": 6, "Display": "02", "Type": 3 },
                                { "Id": 7, "Display": "03", "Type": 3 },
                                { "Id": 8, "Display": "B", "Type": 2 }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        "ItemProperty": "Display",
                        "GroupItemProperty": "Type",
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
            function onListboxReady(view, $view){
                var titles = $view.find('.pl-listbox-group-title .pl-label')
                                .map(function(i, item){return $(item).text()})
                                .toArray();

                assert.sameMembers(titles, ['1', '2', '3'], 'incorrect titles');

                var firstGroup = $view.find('.pl-listbox-group-i:nth-child(1) .pl-listbox-group-body .pl-label')
                                    .map(function(i, item){return $(item).text()})
                                    .toArray();

                assert.sameMembers(firstGroup, ['LTE', '2G', '3G'], 'incorrect first group');

                var secondGroup = $view.find('.pl-listbox-group-i:nth-child(2) .pl-listbox-group-body .pl-label')
                    .map(function(i, item){return $(item).text()})
                    .toArray();

                assert.sameMembers(secondGroup, ['A', 'B'], 'incorrect second group');

                var thirdGroup = $view.find('.pl-listbox-group-i:nth-child(3) .pl-listbox-group-body .pl-label')
                    .map(function(i, item){return $(item).text()})
                    .toArray();

                assert.sameMembers(thirdGroup, ['01', '02', '03'], 'incorrect third group');

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
                var items = $view.find('.pl-listbox-body .pl-label')
                                .map(function(i, item){return $(item).text()})
                                .toArray();

                assert.sameMembers(items, ['LTE', '3G', '2G']);

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
                        "ViewMode": "base",
                        "MultiSelect": true,
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