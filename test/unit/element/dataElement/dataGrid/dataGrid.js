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
            testHelper.applyViewMetadata(metadata, function (view) {
                var grid = view.context.controls["DataGrid1"];
                var $grid = grid.control.controlView.$el;

                onDataGridReady($grid);

                view.close();
            });

            // Then
            function onDataGridReady($grid){
                assert.isObject($grid);
                done();
            }
        });

        it('should render DisabledItemCondition', function (done) {
            // Given When
            testHelper.applyViewMetadata(metadata, function (view) {
                var grid = view.context.controls["DataGrid1"];
                var $grid = grid.control.controlView.$el;

                onDataGridReady($grid);

                //view.close();
            });

            // Then
            function onDataGridReady($grid){
                var disabled = $grid.find("tbody .pl-datagrid-row:nth-child(2) .pl-datagrid-toggle .pl-datagrid-toggle__button").attr('disabled');
                assert.equal(disabled, "disabled");
                done();
            }
        });
    });




});