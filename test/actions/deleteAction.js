describe( 'DeleteAction', function() {
    it( 'successful build', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = new InfinniUI.ObjectDataSource( { name: 'SomeDS', view: view } );

        view.getDataSources().push( dataSource );

        var metadata = {
            DeleteAction: {
                Accept: false,
                DestinationValue: {
                    Source: 'SomeDS'
                }
            }
        };

        // When
        var deleteAction = builder.build( metadata, { parentView: view } );

        // Then
        assert.isNotNull( deleteAction );
        assert.isNotNull( deleteAction.execute, 'action should have execute' );
    } );

    it( 'should delete selected item from ObjectDataSource', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = new InfinniUI.ObjectDataSource( { name: 'SomeDS', view: view } );

        var items = [
            {
                _id: 0,
                Name: 'First'
            },
            {
                _id: 1,
                Name: 'Second'
            },
            {
                _id: 2,
                Name: 'Third'
            }
        ];
        var index = 1;

        dataSource.setItems( _.clone( items ) );

        view.getDataSources().push( dataSource );

        var metadata = {
            DeleteAction: {
                Accept: false,
                DestinationValue: {
                    Source: 'SomeDS',
                    Property: index.toString()
                }
            }
        };

        var deleteAction = builder.build( metadata, { parentView: view } );

        assert.equal( dataSource.getItems().length, 3 );

        // When
        deleteAction.execute();

        // Then
        assert.equal( dataSource.getItems().length, 2 );
        assert.notInclude( dataSource.getItems(), items[ index ] );
    } );

    it( 'should delete selected item from DocumentDataSource', function( done ) {
        // Given
        InfinniUI.providerRegister.register( 'DocumentDataSource', FakeRestDataProvider );

        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = builder.buildType( 'DocumentDataSource', {}, { parent: view, parentView: view, builder: builder } );

        view.getContext().dataSources[ 'DocumentDataSource' ] = dataSource;

        var metadata = {
            DeleteAction: {
                Accept: false,
                DestinationValue: {
                    Source: 'DocumentDataSource',
                    Property: '$'
                }
            }
        };

        var deleteAction = builder.build( metadata, { parentView: view } );

        dataSource.updateItems(
            function() {
                var initCount = dataSource.getItems().length;
                var initSelectedItem = dataSource.getSelectedItem();

                // When
                deleteAction.execute();

                // Then
                dataSource.onItemDeleted( function() {
                    assert.equal( dataSource.getItems().length, ( initCount - 1 ) );
                    assert.notInclude( dataSource.getItems(), initSelectedItem );
                    done();
                } );

            }
        );
    } );

    it( 'should call onExecuted', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = new InfinniUI.ObjectDataSource( { name: 'SomeDS', view: view } );

        dataSource.setItems( [
            {
                _id: 0,
                Name: 'First'
            }
        ] );

        view.getDataSources().push( dataSource );

        var metadata = {
            DeleteAction: {
                OnExecuted: '{ window.onExecutedWasCalled = true; }',
                Accept: false,
                DestinationValue: {
                    Source: 'SomeDS',
                    Property: '0'
                }
            }
        };

        var deleteAction = builder.build( metadata, { parentView: view } );

        assert.isUndefined( window.onExecutedWasCalled );

        // When
        deleteAction.execute();

        // Then
        assert.isTrue( window.onExecutedWasCalled );

        // cleanup
        window.onExecutedWasCalled = undefined;
    } );
} );
