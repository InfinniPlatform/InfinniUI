describe( 'LinkViewBuilderBase', function() {

    it( 'should set base properties', function() {
        // Given
        var applicationBuilder = new InfinniUI.ApplicationBuilder();
        var metadata = {
            View: {
                Name: 'LinkViewBuilderTest'
            }
        };

        var linkView = applicationBuilder.buildType( 'InlineView', metadata, { builder: applicationBuilder, parentView: fakeApplicationView() } );

        assert.equal( linkView.getOpenMode(), 'Default' );
        assert.isUndefined( linkView.containerName );
        assert.isUndefined( linkView.dialogWidth );

        // When
        linkView.setOpenMode( 'Dialog' );
        linkView.setContainer( 'TestContainer' );
        linkView.setDialogWidth( '100px' );

        // Then
        assert.equal( linkView.getOpenMode(), 'Dialog' );
        assert.equal( linkView.containerName, 'TestContainer' );
        assert.equal( linkView.dialogWidth, '100px' );
    } );

    it( 'inlineViewBuilder', function( done ) {
        // Given
        var applicationBuilder = new InfinniUI.ApplicationBuilder();
        var metadata = {
            View: {
                Name: 'InlineViewBuilderTest'
            }
        };

        // When
        var linkView = applicationBuilder.buildType( 'InlineView', metadata, { builder: applicationBuilder, parentView: fakeApplicationView() } );

        linkView.createView( function( view ) {
            // Then
            assert.equal( view.name, 'InlineViewBuilderTest' );
            assert.instanceOf( view, window.InfinniUI.View );
            done();
        } );
    } );

    it( 'metadataViewBuilder', function( done ) {
        // Given
        window.InfinniUI.providerRegister.register( 'MetadataDataSource', function() {
            return {
                'getMetadata': function( callback ) {
                    var metadata = {
                        'Name': 'MetadataViewBuilderTest'
                    };
                    callback( metadata );
                }
            };
        } );

        var applicationBuilder = new InfinniUI.ApplicationBuilder();
        var metadata = {
            Path: 'path/to/metadata'
        };

        // When
        var linkView = applicationBuilder.buildType( 'AutoView', metadata, { builder: applicationBuilder, parentView: fakeApplicationView() } );

        linkView.createView( function( view ) {
            // Then
            assert.equal( view.name, 'MetadataViewBuilderTest' );
            assert.instanceOf( view, window.InfinniUI.View );
            done();
        } );
    } );
} );

