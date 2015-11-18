describe('OpenAction', function () {
    it('successful build', function () {
        // Given
        var view = new View();
        var builder = new ApplicationBuilder();
        var metadata = {
            OpenAction: {
                LinkView: {
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