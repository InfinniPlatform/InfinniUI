describe('ViewPanel', function () {

    it('should build', function () {

        //Given
        var metadata = {
            "ViewPanel": {
                "Visible": true,
                "Text": "ViewPanel1",
                "View": {
                    "InlineView": {
                        "View": {
                            LayoutPanel: {
                                StackPanel: {
                                    Items: []
                                }
                            }
                        },
                        "OpenMode": "Application"
                    }
                }
            }
        };

        var applicationBuilder = new ApplicationBuilder();

        //Then
        var panel = applicationBuilder.build(new View(), metadata);

        //When
        assert.equal(panel.getText(), 'ViewPanel1');
    });

});