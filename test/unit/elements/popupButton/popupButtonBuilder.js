describe( 'PopupButtonBuilder', function() {
    describe( 'build', function() {
        it( 'successful build', function() {
            // Given

            var metadata = {
                Text: 'Click me',
                Action: {
                    OpenAction: {
                        LinkView: {
                            AutoView: {}
                        }
                    }
                },
                OnClick: {
                    Name: 'A'
                },
                Items: [
                    {
                        Button: {
                            Text: 'Click me',
                            Visible: true,
                            HorizontalAlignment: 'Left',
                            Action: {

                            }
                        }
                    },
                    {
                        Button: {
                            Text: 'Административная информация',
                            Visible: true,
                            Action: {

                            }
                        }
                    }
                ]

            };

            // When
            var builder = new InfinniUI.PopupButtonBuilder();
            var button = builder.build( null, { builder: new InfinniUI.ApplicationBuilder(), metadata: metadata, parentView: new InfinniUI.View() } );
            // Then
            assert.isNotNull( button );
            assert.equal( button.getText(), 'Click me' );
            assert.equal( 2, button.getItems().length );

        } );
    } );
} );
