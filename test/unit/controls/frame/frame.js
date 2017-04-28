describe( 'Frame', function() {
    var frame;

    beforeEach( function() {
        frame = new InfinniUI.Frame();
    } );

    describe( 'Render', function() {

        describe( 'Setting the properties', function() {

            it( 'Setting property: value', function() {
                //Given
                var $el = frame.render();

                //When
                frame.setValue( 'http://docs.infinnity.ru/' );

                //Then
                assert.equal( $el.find( 'iframe' ).attr( 'src' ), 'http://docs.infinnity.ru/' );
            } );


        } );

    } );

} );
