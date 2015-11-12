describe('ScrollPanelBuilder', function () {
    it('should build', function () {

        //Given
        var metadata = {
            ScrollPanel: {
                Items: []
            }
        };

        var applicationBuilder = new ApplicationBuilder();

        //When
        var scrollPanel = applicationBuilder.build(metadata, {});

        //Then
        assert.isObject(scrollPanel, 'scrollPanel');
    });

});