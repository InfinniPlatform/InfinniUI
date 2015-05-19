describe('DataGridBuilder', function () {
    describe('build', function () {
        it('successful build', function () {
            // Given

            var metadata = {
                "Name": "DataGrid1",
                "Columns": [
                    {
                        "Name": "Column1",
                        "Text": "Фамилия",
                        "DisplayProperty": "LastName"
                    },
                    {
                        "Name": "Column2",
                        "Text": "Имя",
                        "DisplayProperty": "FirstName"
                    },
                    {
                        "Name": "Column3",
                        "Text": "Отчество",
                        "DisplayProperty": "MiddleName",
                        "Visible": false
                    }
                ]
            };

            // When
            var builder = new DataGridBuilder();
            var grid = builder.build(new ApplicationBuilder(), null, metadata);

            // Then
            assert.isNotNull(grid);
            assert.lengthOf(grid.getColumns(), 3);
            assert.equal(grid.getName(), 'DataGrid1');
            assert.isTrue(grid.getColumns()[0].getVisible());
            assert.isTrue(grid.getColumns()[1].getVisible());
            assert.isFalse(grid.getColumns()[2].getVisible());
            assert.equal(grid.getColumns()[0].getName(), 'Column1');
            assert.equal(grid.getColumns()[1].getName(), 'Column2');
            assert.equal(grid.getColumns()[2].getName(), 'Column3');
            assert.equal(grid.getColumns()[0].getText(), 'Фамилия');
            assert.equal(grid.getColumns()[1].getText(), 'Имя');
            assert.equal(grid.getColumns()[2].getText(), 'Отчество');

        });
    });
});
