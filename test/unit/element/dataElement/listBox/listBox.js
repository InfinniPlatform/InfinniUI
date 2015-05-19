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
                        DocumentDataSource: {
                            Name : "PatientDataSource",
                            ConfigId: 'Demography',
                            DocumentId: 'Patient',
                            IdProperty: 'Id',
                            CreateAction: 'CreateDocument',
                            GetAction: 'GetDocument',
                            UpdateAction: 'SetDocument',
                            DeleteAction: 'DeleteDocument',
                            FillCreatedItem: true
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
                                        "StackPanel": {
                                            "Items": [
                                                {
                                                    "TextBox": {
                                                        "Name": "TextBox1"
                                                    }
                                                }
                                            ]

                                        }
                                    },
                                    "Items" : {
                                        "PropertyBinding": {
                                            "DataSource": "PatientDataSource",
                                            "Property": ""
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            };

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