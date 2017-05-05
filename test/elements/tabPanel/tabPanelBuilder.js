describe( 'TabPanelBuilder', function() {
    it( 'should build', function() {

        //Given
        var metadata = {
            TabPanel: {
                Items: []
            }
        };

        var applicationBuilder = new InfinniUI.ApplicationBuilder();

        //When
        var element = applicationBuilder.build( metadata, {} );

        //Then
        assert.isObject( element, 'TabPanel' );
    } );

} );
