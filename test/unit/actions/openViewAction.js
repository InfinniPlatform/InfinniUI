describe('OpenViewAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var metadata = {
            OpenViewAction: {
                View: {
                    InlineView: {

                    }
                }
            }
        };

        // When
        var openAction = builder.build(metadata, {parentView: view});

        // Then
        assert.isNotNull( openAction );
        assert.isNotNull( openAction.execute, 'action should have execute' );
    });

});