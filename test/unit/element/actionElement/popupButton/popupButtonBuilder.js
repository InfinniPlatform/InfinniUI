describe('PopupButtonBuilder', function () {
    describe('build', function () {
        it('successful build', function () {
            // Given

            var metadata = {
                Text: "Click me",
                Action: {
                    OpenViewAction: {
                        View: {
                            InlineView: {
                                "ConfigId": "Structure",
                                "DocumentId": "Department",
                                "ViewType": "EditView"
                            }
                        }
                    }
                },
                OnClick:{
                    Name:"A"
                },
                Items: [
                    {
                        Button: {
                            Text: "Click me",
                            Visible: true,
                            HorizontalAlignment: 'Left',
                            Action: {

                            }
                        }
                    },
                    {
                        Button: {
                            Text: "Административная информация",
                            Visible: true,
                            Action: {

                            }
                        }
                    }
                ]

            };

            // When
            var builder = new PopupButtonBuilder();
            var button = builder.build(new ApplicationBuilder(), null, metadata);
            // Then
            assert.isNotNull(button);
            assert.equal(button.getText(), 'Click me');
            assert.isNotNull(button.getAction());
            assert.equal(2,button.getItems().length);

            assert.isTrue(button.getItems()[0] instanceof Button)
            assert.isTrue(button.getItems()[1] instanceof Button)
        });
    });
});
