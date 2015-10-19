describe('AddAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var dataSource = new ObjectDataSource({ view: view });

        view.getDataSources()['SomeDS'] = dataSource;

        var metadata = {
            AddAction: {
                View: {
                    InlineView: {

                    }
                },
                DataSource: 'SomeDS'
            }
        };

        // When
        var addAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( addAction );
        assert.isNotNull( addAction.execute, 'action should have execute' );
    });

});