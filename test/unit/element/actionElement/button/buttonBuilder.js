describe('ButtonBuilder', function () {
    describe('build', function () {
        it('successful build', function () {
            // Given

            var metadata = {
                Text: "Click me",
                Visible: false,
                HorizontalAlignment: 'Right',
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
                }
            };

            // When
            var builder = new ButtonBuilder();
            var button = builder.build(null, {builder: new ApplicationBuilder(), metadata: metadata});

            // Then
            assert.isNotNull(button);
            assert.equal(button.getText(), 'Click me');
            assert.isFalse(button.getVisible());
            assert.equal(button.getHorizontalAlignment(), 'Right');
            assert.isNotNull(button.getAction());
        });

        it('should pass parentView for builder', function () {
            //Given
            var builder = new ButtonBuilder(),
                applicationBuilder = {
                    build: function (parentView, metadata) {
                        //Then
                        assert.equal(parentView, 42);
                    }
                },
                parentView = 42,
                metadata = { Action: 23 };

            //When
            builder.build(null, {builder: applicationBuilder, parent: parentView, metadata: metadata});
        });
    });
});
