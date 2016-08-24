describe('Container (Control)', function () {

    describe('StackPanel as exemplar of Container', function () {

        it('should render stackPanel with templating items', function () {
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

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemTemplate": {
                            "TextBox": {
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-text-box-input'), 3, 'length of rendered textbox');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'binding in itemTemplate is right');
            }
        });


        it('should render stackPanel with not templating items', function () {
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

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "Items" : [
                            {
                                "TextBox": {
                                    "Name": "TextBox1",
                                    "Value": {
                                        "Source": "ObjectDataSource1",
                                        "Property": "Display"
                                    }
                                }
                            },{
                                "TextBox": {
                                    "Name": "TextBox2",
                                    "Value": {
                                        "Source": "ObjectDataSource1",
                                        "Property": "Id"
                                    }
                                }
                            }
                        ]
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 2, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-text-box-input'), 2, 'length of rendered textbox');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'binding in itemTemplate is right');
            }
        });


        it('should render stackPanel with simple items', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                "LTE",
                                "3G",
                                "2G"
                            ]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-label').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.pl-label').first().text(), 'LTE', 'content of first element is right');
            }
        });


        it('should render stackPanel with property items', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {
                                    Name: {Temp: "LTE"}
                                },
                                {
                                    Name: {Temp: "3G"}
                                },
                                {
                                    Name: {Temp: "2G"}
                                }
                            ]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemProperty": "Name.Temp",
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-label').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.pl-label').first().text(), 'LTE', 'content of first element is right');
            }
        });



        it('should render stackPanel with formatting items', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {
                                    Name: {Temp: "LTE"}
                                },
                                {
                                    Name: {Temp: "3G"}
                                },
                                {
                                    Name: {Temp: "2G"}
                                }
                            ]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemFormat": "Connect: {Name.Temp}",
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-label').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.pl-label').first().text(), 'Connect: LTE', 'content of first element is right');
            }
        });


        it('should render stackPanel with selector items', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [
                                {
                                    Name: {Temp: "LTE"}
                                },
                                {
                                    Name: {Temp: "3G"}
                                },
                                {
                                    Name: {Temp: "2G"}
                                }
                            ]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemSelector":{
                            Name: 'GetTitle'
                        },
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": ""
                        }
                    }
                }],

                Scripts: [
                    {
                        Name: 'GetTitle',
                        Body: "return '!! ' + args.value.Name.Temp;"
                    }
                ]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-label').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.pl-label').first().text(), '!! LTE', 'content of first element is right');
            }
        });


        it('should stackPanel has child and parent (templating items)', function () {
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

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemTemplate": {
                            "TextBox": {
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var stackPanel = view.getContext().controls['MainViewPanel'];

                assert.instanceOf(stackPanel.getParent(), InfinniUI.View, 'stackPanel parent is View');
                assert.lengthOf(stackPanel.getChildElements(), 3, 'length of stackPanel children is right');
                assert.equal(stackPanel.getChildElements()[0].getParent(), stackPanel, 'child of stackPanel has parent - stackPanel');

                // When
                var ds = view.getContext().dataSources['ObjectDataSource1'],
                    items = ds.getItems();

                items.reverse();

                ds.setItems(items);
                ds.updateItems();

                // Then
                assert.lengthOf(stackPanel.getChildElements(), 3, 'length of stackPanel children is right (after updating items)');
            }
        });

        it('should stackPanel working with relative binding', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [{
                                "It": [{ "Id": 1, "Display": "LTE" },
                                    { "Id": 2, "Display": "3G" },
                                    { "Id": 3, "Display": "2G" }
                                ]
                            }]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemTemplate": {
                            "TextBox": {
                                "Name": "TextBox1",
                                "Value": {
                                    "Source": "ObjectDataSource1",
                                    "Property": "@.#.Display"
                                }
                            }
                        },
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": "$.It"
                        }
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-text-box-input'), 3, 'count of textboxes is right');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'value in first textbox is right');
                assert.equal($layout.find('.pl-text-box-input:last').val(), '2G', 'value in last textbox is right');
            }
        });

        it('should stackPanel working with deep relative binding', function () {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources : [
                    {
                        ObjectDataSource: {
                            "Name": "ObjectDataSource1",
                            "Items": [{
                                "It": [{
                                        id: 1,
                                        subIt: [{ "Id": 1, "Display": "LTE" },
                                            { "Id": 2, "Display": "3G" },
                                            { "Id": 3, "Display": "2G" }]
                                    },{
                                        id: 2,
                                        subIt: [{ "Id": 1, "Display": "LTE-2" },
                                            { "Id": 2, "Display": "3G-2" },
                                            { "Id": 3, "Display": "2G-2" }]
                                    }
                                ]
                            }]
                        }
                    }
                ],
                Items: [{

                    StackPanel: {
                        Name: 'MainViewPanel',
                        "ItemTemplate": {
                            "StackPanel": {
                                "Items" : [
                                    {
                                        "Label":{
                                            "Value":{
                                                "Source": "ObjectDataSource1",
                                                "Property": "@.#.id"
                                            }
                                        }
                                    },
                                    {
                                        "StackPanel": {
                                            "Items" : {
                                                "Source": "ObjectDataSource1",
                                                "Property": "@.#.subIt"
                                            },
                                            "ItemTemplate":{
                                                "TextBox": {
                                                    "Name": "TextBox1",
                                                    "Value": {
                                                        "Source": "ObjectDataSource1",
                                                        "Property": "@.#.Display"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }

                        },
                        "Items" : {
                            "Source": "ObjectDataSource1",
                            "Property": "$.It"
                        }
                    }
                }]
            };

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-text-box-input'), 6, 'count of textboxes is right');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'value in first textbox is right');
                assert.equal($layout.find('.pl-text-box-input:last').val(), '2G-2', 'value in last textbox is right');
            }
        });
    });



    describe('ListBox as exemplar of Container', function (){

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
                                { "Id": 2, "Display": "2G" },
                                { "Id": 3, "Display": "2G" }
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
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox');
                assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            }
        });

    });

    it('should render listBox with grouping (with template group title)', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "LTE" },
                            { "Id": 2, "Display": "2G" },
                            { "Id": 3, "Display": "2G" }
                        ]
                    }
                }
            ],
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    "Items" : [
                        {
                            ListBox: {
                                "ItemTemplate": {
                                    "TextBox": {
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
                                            "Property": "#.Display"
                                        }
                                    }
                                },
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "Source": "ObjectDataSource1",
                                    "Property": ""
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        testHelper.applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox is right');
            assert.lengthOf($layout.find('.pl-listbox-group-i'), 2, 'length of rendered group is right');
            assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            assert.equal($.trim( $layout.find('.pl-listbox-group-title').last().text() ), '2G', 'group value in template is right');
        }
    });


    it('should render listBox with grouping (with format group title)', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "LTE" },
                            { "Id": 2, "Display": "2G" },
                            { "Id": 3, "Display": "2G" }
                        ]
                    }
                }
            ],
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    "Items" : [
                        {
                            ListBox: {
                                "ItemTemplate": {
                                    "TextBox": {
                                        "Name": "TextBox1",
                                        "Value": {
                                            "Source": "ObjectDataSource1",
                                            "Property": "#.Display"
                                        }
                                    }
                                },
                                "GroupItemFormat": "Connect: {Display}",
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "Source": "ObjectDataSource1",
                                    "Property": ""
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        testHelper.applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox is right');
            assert.lengthOf($layout.find('.pl-listbox-group-i'), 2, 'length of rendered group is right');
            assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            assert.equal($.trim( $layout.find('.pl-listbox-group-title').last().text() ), 'Connect: 2G', 'group value in template is right');
        }
    });

    it('should render listBox with sorting items', function () {
        // Given
        var metadata = {
            Text: 'Пациенты',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 2, "Display": "LTE" },
                            { "Id": 1, "Display": "2G" },
                            { "Id": 3, "Display": "2G" }
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
                                "Source": "ObjectDataSource1",
                                "Property": "#.Display"
                            }
                        }
                    },
                    "Items" : {
                        "Source": "ObjectDataSource1",
                        "Property": ""
                    },

                    "ItemComparator": {
                        "Name": "IdComparator"
                    }
                }
            }],

            "Scripts":[
                {
                    Name: 'IdComparator',
                    Body: "return args.item2.Id - args.item1.Id;"
                }
            ]
        };


        // When
        testHelper.applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox');
            assert.equal($layout.find('.pl-text-box-input').eq(0).val(), '2G', 'value in template is right');
            assert.equal($layout.find('.pl-text-box-input').eq(1).val(), 'LTE', 'value in template is right');
            assert.equal($layout.find('.pl-text-box-input').eq(2).val(), '2G', 'value in template is right');
        }
    });
});
