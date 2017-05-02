describe( 'FileBox', function() {

    describe( 'Builder', function() {

        it( 'should build fileBox', function() {
            // Given
            var builder = new InfinniUI.ApplicationBuilder();
            var metadata = {
                MaxSize: 0,
                AcceptTypes: [
                    'image/png',
                    'image/jpeg'
                ]
            };

            // When
            var fileBox = builder.buildType( 'FileBox', metadata, { parentView: fakeView(), builder: builder } );

            // Then
            assert.instanceOf( fileBox, InfinniUI.FileBox );
            assert.equal( fileBox.getMaxSize(), metadata.MaxSize );
            assert.deepEqual( fileBox.getAcceptTypes().toArray(), metadata.AcceptTypes );
        } );

    } );

    describe( 'Base API', function() {

        it( 'setting properties', function() {
            // Given
            var fileBox = new InfinniUI.FileBox();

            // When
            fileBox.setMaxSize( 50000 );
            fileBox.setFile( 'file' );
            fileBox.setAcceptTypes( ['video/*'] );
            fileBox.setValue( { Info: {} } );

            // Then
            assert.equal( fileBox.getMaxSize(), 50000 );
            assert.equal( fileBox.getFile(), 'file' );
            assert.deepEqual( fileBox.getAcceptTypes().toArray(), ['video/*'] );
            assert.deepEqual( fileBox.getValue(), { Info: {} } );
        } );

    } );
} );
