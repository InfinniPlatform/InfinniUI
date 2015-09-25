describe('Container (Control)', function () {

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
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items" : {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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
                                        "PropertyBinding":{
                                            "Source": "ObjectDataSource1",
                                            "Property": "Display"
                                        }
                                    }
                                }
                            },{
                                "TextBox": {
                                    "Name": "TextBox2",
                                    "Value": {
                                        "PropertyBinding":{
                                            "Source": "ObjectDataSource1",
                                            "Property": "Id"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }]
            };

            // When
            applyViewMetadata(metadata, onViewReady);

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
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), 'LTE', 'content of first element is right');
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
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), 'LTE', 'content of first element is right');
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
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), 'Connect: LTE', 'content of first element is right');
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
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            }
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
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), '!! LTE', 'content of first element is right');
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
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items" : {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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

                var stackPanel = view.getContext().controls['MainViewPanel'];

                assert.instanceOf(stackPanel.getParent(), View, 'stackPanel parent is View');
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
                                    "PropertyBinding":{
                                        "Source": "ObjectDataSource1",
                                        "Property": "$.Display"
                                    }
                                }
                            }
                        },
                        "Items" : {
                            "PropertyBinding": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
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
                                            "PropertyBinding":{
                                                "Source": "ObjectDataSource1",
                                                "Property": "$.Display"
                                            }
                                        }
                                    }
                                },
                                "GroupItemTemplate": {
                                    "Label": {
                                        "Value": {
                                            "PropertyBinding":{
                                                "Source": "ObjectDataSource1",
                                                "Property": "$.Display"
                                            }
                                        }
                                    }
                                },
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "PropertyBinding": {
                                        "Source": "ObjectDataSource1",
                                        "Property": ""
                                    }
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        applyViewMetadata(metadata, onViewReady);

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
                                            "PropertyBinding":{
                                                "Source": "ObjectDataSource1",
                                                "Property": "$.Display"
                                            }
                                        }
                                    }
                                },
                                "GroupItemFormat": "Connect: {Display}",
                                "GroupValueProperty": "Display",
                                "Items" : {
                                    "PropertyBinding": {
                                        "Source": "ObjectDataSource1",
                                        "Property": ""
                                    }
                                }
                            }
                        }
                    ]
                }
            }]
        };


        // When
        applyViewMetadata(metadata, onViewReady);

        // Then
        function onViewReady(view, $layout){
            $layout.detach();

            assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox is right');
            assert.lengthOf($layout.find('.pl-listbox-group-i'), 2, 'length of rendered group is right');
            assert.equal($layout.find('.pl-text-box-input').first().val(), 'LTE', 'value in template is right');
            assert.equal($.trim( $layout.find('.pl-listbox-group-title').last().text() ), 'Connect: 2G', 'group value in template is right');
        }
    });
});