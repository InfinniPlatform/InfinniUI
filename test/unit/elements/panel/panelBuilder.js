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

        var builder = new InfinniUI.ApplicationBuilder();
        var panel = builder.build(metadata, {parentView: fakeView()});

        //When
        assert.equal(panel.getText(), 'panel');
    });

});
