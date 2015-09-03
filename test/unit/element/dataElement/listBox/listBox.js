describe('ListBox', function () {

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
        LayoutPanel: {

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
        }
    };

    describe('render', function () {
        it('should render stackPanel', function () {
            // Given When
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata2, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $stackPanel = $('#sandbox').children();
                //$listbox.detach();

                onListboxReady($stackPanel);
            });

            // Then
            function onListboxReady($stackPanel){
                assert.lengthOf($stackPanel.find('.stackpanel-item'), 3, 'length of rendered stackPanel');
                assert.lengthOf($stackPanel.find('.pl-control-editor'), 3, 'length of rendered textbox');
            }
        });
    });

/*
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
        LayoutPanel: {

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
        }
    };

    describe('render', function () {
        it('should render listBox', function () {
            // Given When
            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType(fakeView(), 'View', metadata);
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
                assert.lengthOf($listbox.find('.listbox-item-content'), 3, 'length of rendered listbox');
            }
        });
    });
*/
});