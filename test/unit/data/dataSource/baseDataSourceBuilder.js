describe( 'baseDataSourceBuilder', function() {

    it( 'should init CustomProperties', function() {
        // Given
        var builder = new InfinniUI.ApplicationBuilder(),
            metadata = {
                CustomProperties: {
                    pageNumber: 0,
                    pageSize: 10
                }
            };

        // When
        var dataSource = builder.buildType( 'ObjectDataSource', metadata, { parentView: fakeView() } );

        // Then
        assert.equal( dataSource.getProperty( '.pageNumber' ), 0 );
        assert.equal( dataSource.getProperty( '.pageSize' ), 10 );
    } );
} );
