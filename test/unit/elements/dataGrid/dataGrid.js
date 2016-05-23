describe('DataGrid', function () {

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

            "DataGrid": {
                "Name": "DataGrid1",
                "Items": {
                    "Source": "ObjectDataSource1",
                    "Property": ""
                },
                "DisabledItemCondition": "{ return (args.value.Id == 2); }",
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
        }]
    };

    describe('render', function () {
        it('should render DataGrid', function (done) {
            // Given When
            testHelper.applyViewMetadata(metadata, function (view, $grid) {
                onDataGridReady($grid);

                view.close();
            });

            // Then
            function onDataGridReady($grid){
                assert.isObject($grid);

                var headers = $grid.find(".pl-datagrid-row_header .pl-label");
                assert.equal(headers.first().text(), "Id");
                assert.equal(headers.last().text(), "Display");

                var $body = $grid.find(".pl-datagrid-row_data");
                assert.equal($body.length, 3);

                done();
            }
        });

        it('should render DisabledItemCondition', function (done) {
            // Given When
            testHelper.applyViewMetadata(metadata, function (view, $grid) {
                onDataGridReady($grid);

                view.close();
            });

            // Then
            function onDataGridReady($grid){
                var $secondItem = $grid.find("tbody .pl-datagrid-row:nth-child(2)");

                assert.isTrue($secondItem.hasClass('disabled-list-item'));

                done();
            }
        });
    });




});