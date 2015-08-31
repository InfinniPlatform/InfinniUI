describe('ListBox', function () {

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

            StackPanel: {
                Name: 'MainViewPanel',
                Items: [
                    {
                        "ListBox": {
                            "ItemTemplate": {
                                "TextBox": {
                                    "Name": "TextBox1",
                                    "Value": {
                                        "PropertyBinding":{
                                            "DataSource": "ObjectDataSource1",
                                            "Property": "$.Display"
                                        }
                                    }
                                }
                            },
                            "Items" : {
                                "PropertyBinding": {
                                    "DataSource": "ObjectDataSource1",
                                    "Property": ""
                                }
                            }
                        }
                    }
                ]
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
                //$listbox.detach();

                onListboxReady($listbox);
            });

            // Then
            function onListboxReady($listbox){
                assert.lengthOf($listbox.find('.listbox-item-content'), 3, 'length of rendered listbox');
            }
        });
    })
});