describe('UpdateAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var dataSource = new ObjectDataSource({ name: 'MainDS', view: view });
        var builder = new ApplicationBuilder();

        view.getDataSources().push(dataSource);

        var metadata = {
            UpdateAction: {
                DestinationValue: {
                    Source: 'MainDS'
                }
            }
        };

        // When
        var updateAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( updateAction );
        assert.isNotNull( updateAction.execute, 'action should have execute' );
    });

    it('should update DataSource', function () {
        // Given
        var view = new View();
        var dataSource = new ObjectDataSource({ name: 'MainDS', view: view });
        var builder = new UpdateActionBuilder();

        window.dsWasUpdated = false;

        view.getDataSources().push(dataSource);
        dataSource.onItemsUpdated(function(){
            window.dsWasUpdated = true;
        });

        var metadata = {
            DestinationValue: {
                Source: 'MainDS'
            }
        };

        var updateAction = builder.build(null, {parentView: view, metadata: metadata});

        assert.isFalse(window.dsWasUpdated, 'initial data is invalid');

        // When
        updateAction.execute();

        // Then
        assert.isTrue(window.dsWasUpdated, 'ds should be update');
    });
});