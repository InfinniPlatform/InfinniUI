describe( 'DateTimePickerBuilder', function() {
    describe( 'build', function() {
        it( 'successful build DateTimePicker', function() {
            // Given

            var dateTimePickerMetadata = {};

            // When
            var builder = new InfinniUI.DateTimePickerBuilder();
            var dateTimePicker = builder.build( null, { builder: new InfinniUI.ApplicationBuilder(), view: new InfinniUI.View(), metadata: dateTimePickerMetadata } );

            // Then
            assert.isNotNull( dateTimePicker );
            assert.isObject( dateTimePicker );

        } );
    } );
} );
