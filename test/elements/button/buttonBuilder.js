describe( 'ButtonBuilder', function() {
    describe( 'build', function() {
        it( 'successful build', function() {
            // Given

            var metadata = {
                Text: 'Click me',
                Visible: false,
                HorizontalAlignment: 'Right',
                Action: {
                    OpenAction: {
                        LinkView: {
                            AutoView: {}
                        }
                    }
                }
            };

            // When
            var builder = new InfinniUI.ButtonBuilder();
            var button = builder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata, parentView: new InfinniUI.View() } );

            // Then
            assert.isNotNull( button );
            assert.equal( button.getText(), 'Click me' );
            assert.isFalse( button.getVisible() );
            assert.equal( button.getHorizontalAlignment(), 'Right' );
        } );

    } );
} );
