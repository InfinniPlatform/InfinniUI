describe('EditAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ view: view });

        view.getDataSources()['SomeDS'] = dataSource;

        var metadata = {
            EditAction: {
                LinkView: {
                    InlineView: {

                    }
                },
                DataSource: 'SomeDS'
            }
        };

        // When
        var editAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( editAction );
        assert.isNotNull( editAction.execute, 'action should have execute' );
    });

});