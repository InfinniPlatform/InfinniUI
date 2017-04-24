describe( 'ValidationResult', function() {

    it( 'should create ValidationResult object', function() {
        var validationResult = new InfinniUI.ValidationResult();

        assert.equal( validationResult.IsValid, true );
        assert.equal( validationResult.Items.length, 0 );
    } );

    it( 'should set IsValid to false', function() {
        var validationResult = new InfinniUI.ValidationResult();

        validationResult.error( 'some error happend', 'someProperty' );

        assert.equal( validationResult.IsValid, false );
        assert.equal( validationResult.Items.length, 1 );
    } );

    it( 'should validate required properties', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'ValidationErrors': '{ return InfinniUI.validateItems( context, args ) }',
                        'Items': []
                    }
                }
            ]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var validationResult = new InfinniUI.ValidationResult();
            InfinniUI.validateItems = function( context, args ) {
                if( !args._id ) {
                    validationResult.error( '_id doesn\'t exist' );
                }

                if( args.name.length < 5 ) {
                    validationResult.error( 'not correct name' );
                }

                if( args.price > 5 ) {
                    validationResult.error( 'too big price' );
                }
                return validationResult;
            };
            var destinationDS = view.context.dataSources[ 'ObjectDataSource' ];
            var item = {
                _id: 1,
                name: 'Name',
                price: 10
            };
            destinationDS._includeItemToModifiedSet( item );

            // When
            destinationDS.saveItem( item );

            // Then
            assert.equal( validationResult.IsValid, false );
            assert.equal( validationResult.Items.length, 2 );
            done();

            // cleanup
            view.close();

        } );

    } );

} );
