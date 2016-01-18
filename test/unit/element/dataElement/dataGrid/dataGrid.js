describe('DataGrid', function () {

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
                        "DataGrid": {
                            "Items": {
                                "Source": "ObjectDataSource1",
                                "Property": ""
                            },
                            "Columns": [
                                {
                                    "Header": "Id",
                                    "CellProperty": "Id"
                                },
                                {
                                    "Header": "Display",
                                    "CellProperty": "Display"
                                }
                            ]
                        }
                    }
                ]
            }
        }]
    };

    describe('render', function () {
        it('should render DataGrid', function () {
            // Given When
            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $stackPanel = $('#sandbox').children();
                $stackPanel.detach();

                onListboxReady($stackPanel);
            });

            // Then
            function onListboxReady($grid){
                console.log($grid);
                assert.isObject($grid);

            }
        });
    });




});