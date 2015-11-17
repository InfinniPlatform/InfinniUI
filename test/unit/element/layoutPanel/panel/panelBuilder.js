describe('PanelBuilder', function () {
    it('should build', function () {

        //Given
        var metadata = {
            Panel: {
                Text: 'panel',
                Items: [
                    {
                        TextBox: {
                            Name: 'text'
                        }
                    }
                ]
            }
        };

        var applicationBuilder = new ApplicationBuilder();

        //Then
        var panel = applicationBuilder.build(applicationBuilder, metadata);

        //When
        assert.equal(panel.getText(), 'panel');
    });

});