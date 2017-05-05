describe( 'PasswordBoxBuilder', function() {
    describe( 'build', function() {
        it( 'successful build PasswordBox', function() {
            // Given

            var metadata = {};

            // When
            var builder = new InfinniUI.LabelBuilder();
            var element = builder.build( null, { builder: new InfinniUI.ApplicationBuilder(), view: new InfinniUI.View(), metadata: metadata } );

            // Then
            assert.isNotNull( element );
            assert.isObject( element );
        } );
    } );
} );
