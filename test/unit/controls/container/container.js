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
        var metadata1 = {
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

        it('should render stackPanel with templating items', function () {
            // Given When
            var metadata = metadata1;
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-text-box-input'), 3, 'length of rendered textbox');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'binding in itemTemplate is right');
            }
        });


        var metadata2 = {
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

        it('should render stackPanel with not templating items', function () {
            // Given When
            var metadata = metadata2;
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 2, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.pl-text-box-input'), 2, 'length of rendered textbox');
                assert.equal($layout.find('.pl-text-box-input:first').val(), 'LTE', 'binding in itemTemplate is right');
            }
        });

        var metadata3 = {
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


        it('should render stackPanel with simple items', function () {
            // Given When
            var metadata = metadata3;
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), 'LTE', 'content of first element is right');
            }
        });


        var metadata4 = {
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


        it('should render stackPanel with property items', function () {
            // Given When
            var metadata = metadata4;
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($layout.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($layout.find('.label-control').first().text(), 'LTE', 'content of first element is right');
            }
        });


    });



    describe('ListBox as exemplar of Container', function (){
        var metadata1 = {
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

        it('should render listBox with grouping', function () {
            // Given When
            var metadata = metadata1;
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                //$layout.detach();

                assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox');
            }
        });


        var metadata2 = {
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

        it('should render listBox without grouping', function () {
            // Given When
            var metadata = metadata2;
            /*applyViewMetadata(metadata, onViewReady);*/

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                assert.lengthOf($layout.find('.pl-listbox-body'), 3, 'length of rendered listbox');
            }
        });

    });





    var metadata5 = {
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
                    "Label": {
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

    describe('render lb3', function () {
        it('should render listBox without grouping', function () {
            // Given When
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata5, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $listbox = $('#sandbox').children();
                $listbox.detach();

                onListboxReady($listbox);
            });

            // Then
            function onListboxReady($listbox){
                assert.lengthOf($listbox.find('.pl-listbox-body'), 3, 'length of rendered listbox');
            }
        });
    });





    var metadata8 = {
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

    describe('render property list formatting ', function () {
        it('should render stackPanel with formatting items', function () {
            // Given When
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata8, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $stackPanel = $('#sandbox').children();
                $stackPanel.detach();

                onStackPanelReady($stackPanel);
            });

            // Then
            function onStackPanelReady($stackPanel){
                assert.lengthOf($stackPanel.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($stackPanel.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($stackPanel.find('.label-control').first().text(), 'Connect: LTE', 'content of first element is right');
            }
        });
    });

    var metadata9 = {
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

    describe('render property list formatting ', function () {
        it('should render stackPanel with formatting items', function () {
            // Given When
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata9, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $stackPanel = $('#sandbox').children();
                $stackPanel.detach();

                onStackPanelReady($stackPanel);
            });

            // Then
            function onStackPanelReady($stackPanel){
                assert.lengthOf($stackPanel.find('.pl-stack-panel-i'), 3, 'length of rendered stackPanel');
                assert.lengthOf($stackPanel.find('.label-control').not(':empty'), 3, 'length of rendered stackPanel');
                assert.equal($stackPanel.find('.label-control').first().text(), '!! LTE', 'content of first element is right');
            }
        });
    });

});