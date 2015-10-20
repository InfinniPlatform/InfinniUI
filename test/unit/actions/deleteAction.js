describe('DeleteAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ view: view });

        view.getDataSources()['SomeDS'] = dataSource;

        var metadata = {
            DeleteAction: {
                Accept: false,
                DataSource: 'SomeDS'
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
        var dataSource = new ObjectDataSource({ view: view });

        var items = [
            {
                Id: 1,
                Name: 'First'
            },
            {
                Id: 2,
                Name: 'Second'
            }
        ];
        var selectedItem = items[0];

        view.getDataSources()['SomeDS'] = dataSource;
        dataSource.setItems(items);
        dataSource.setSelectedItem(selectedItem);

        var metadata = {
            DeleteAction: {
                Accept: false,
                DataSource: 'SomeDS'
            }
        };

        var deleteAction = builder.build(metadata, {parentView: view});

        assert.equal(dataSource.getItems().length, 2);

        // When
        deleteAction.execute();

        // Then
        assert.equal(dataSource.getItems().length, 1);
        assert.notInclude(dataSource.getItems(), selectedItem);
    });

});