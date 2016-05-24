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
            testHelper.applyViewMetadata(metadata, onDataGridReady);

            // Then
            function onDataGridReady(view, $grid){
                assert.isObject($grid);

                var headers = $grid.find(".pl-datagrid-row_header .pl-label");
                assert.equal(headers.first().text(), "Id");
                assert.equal(headers.last().text(), "Display");

                var $body = $grid.find(".pl-datagrid-row_data");
                assert.equal($body.length, 3);

                done();
                view.close();
            }
        });
    });

    describe('API', function () {
        it('should update DisabledItemCondition', function (done) {
            // Given
            testHelper.applyViewMetadata(metadata, function (view, $grid) {
                var grid = view.context.controls['DataGrid1'];
                //var $grid = grid.control.controlView.$el;
                var newCondition = function (context, args) {
                    return args.value.Id == 1;
                };

                var $rows = $grid.find("tbody .pl-datagrid-row");

                assert.isFalse($rows.eq(0).hasClass('pl-disabled'), 'bad render for enabled item');
                assert.isTrue($rows.eq(1).hasClass('pl-disabled'), 'bad render for disabled item');

                // When
                grid.setDisabledItemCondition(newCondition);

                $rows = $grid.find("tbody .pl-datagrid-row");

                // Then
                assert.isTrue($rows.eq(0).hasClass('pl-disabled'), 'items not updated');
                assert.isFalse($rows.eq(1).hasClass('pl-disabled'), 'items not updated');

                done();
                view.close();
            });


        });
    });
});