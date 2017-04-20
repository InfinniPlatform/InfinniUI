describe( 'ButtonControl', function() {
    describe( 'render', function() {
        it( 'should render button with correct class', function() {
            //Given
            var builder = new InfinniUI.ApplicationBuilder(),
                button = builder.buildType( 'Button', {} );

            //When
            var $el = button.render();

            //Then
            assert.isTrue( $el.hasClass( 'pl-button' ) );
        } );
    } );
} );
