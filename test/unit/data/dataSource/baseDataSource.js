describe( 'baseDataSource', function() {

    it( 'should check ErrorValidator before save', function( done ) {
        // Given
        var dataSource = new InfinniUI.ObjectDataSource( { view: fakeView() } );

        dataSource.setErrorValidator( function( context, args ) {
            done();
            return {
                IsValid: true
            };
        } );

        dataSource.createItem( function( context, args ) {
            //When
            var item = args.value;

            dataSource.saveItem( item );
        } );
    } );
} );
