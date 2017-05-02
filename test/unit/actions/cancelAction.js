describe( 'CancelAction', function() {
    it( 'successful build', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();

        // When
        var cancelAction = builder.build( { CancelAction: {} }, { parentView: view } );

        // Then
        assert.isNotNull( cancelAction );
        assert.isNotNull( cancelAction.execute, 'action should have execute' );
    } );

    it( 'set cancel as DialogResult for parentView', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.CancelActionBuilder();
        var cancelAction = builder.build( null, { parentView: view, metadata: {} } );

        assert.equal( view.getDialogResult(), InfinniUI.DialogResult.none );

        // When
        cancelAction.execute();

        // Then
        assert.equal( view.getDialogResult(), InfinniUI.DialogResult.canceled, 'DialogResult should be canceled' );
    } );

    it( 'should call onExecuted', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.CancelActionBuilder();
        var cancelAction = builder.build( null, {
            builder: new InfinniUI.ApplicationBuilder(),
            parentView: view,
            metadata: {
                OnExecuted: '{ window.onExecutedWasCalled = true; }'
            }
        } );

        assert.isUndefined( window.onExecutedWasCalled );

        // When
        cancelAction.execute();

        // Then
        assert.isTrue( window.onExecutedWasCalled );

        // cleanup
        window.onExecutedWasCalled = undefined;
    } );
} );
