describe('ListBox', function () {
    describe('render', function () {
        it('should render listBox', function () {

            window.providerRegister.register('DocumentDataSource', function () {
                return new FakeDataProvider();
            });

            $('body').append($('<div>').attr('id', 'page-content'));

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
debugger;
            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType(fakeView(), 'View', metadata);
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();
            });
        });
    })
});