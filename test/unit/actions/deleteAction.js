describe('DeleteAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ name: 'SomeDS', view: view });

        view.getDataSources().push(dataSource);

        var metadata = {
            DeleteAction: {
                Accept: false,
                DestinationValue: {
                    Source: 'SomeDS'
                }
            }
        };

        // When
        var deleteAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( deleteAction );
        assert.isNotNull( deleteAction.execute, 'action should have execute' );
    });

    it('should delete selected item', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ name: 'SomeDS', view: view });

        var items = [
            {
                Name: 'First'
            },
            {
                Name: 'Second'
            },
            {
                Name: 'Third'
            }
        ];
        var index = 1;

        dataSource.setItems(_.clone(items));

        view.getDataSources().push(dataSource);

        var metadata = {
            DeleteAction: {
                Accept: false,
                DestinationValue: {
                    Source: 'SomeDS',
                    Property: index.toString()
                }
            }
        };

        var deleteAction = builder.build(metadata, {parentView: view});

        assert.equal(dataSource.getItems().length, 3);

        // When
        deleteAction.execute();

        // Then
        assert.equal(dataSource.getItems().length, 2);
        assert.notInclude(dataSource.getItems(), items[index]);
    });

});