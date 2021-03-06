describe( 'TextEditorBase (Control)', function() {
    describe( 'Textbox as exemplar of TextEditorBase', function() {
        var metadata1 = {
            DataSources: [
                {
                    ObjectDataSource: {
                        'Name': 'ObjectDataSource1',
                        'Items': [
                            { 'Id': 1, 'Display': '2.2222' },
                            { 'Id': 2, 'Display': '3.2222' },
                            { 'Id': 3, 'Display': '4.2222' }
                        ]
                    }
                }
            ],
            Items: [{

                'TextBox': {
                    'Name': 'TextBox1',
                    'Value': {
                        'Source': 'ObjectDataSource1',
                        'Property': '$.Display'
                    },
                    'DisplayFormat': {
                        'NumberFormat': {
                            'Format': 'n2'
                        }
                    },
                    'EditMask': {
                        'NumberEditMask': {
                            'Mask': 'n3'
                        }
                    }
                }
            }]
        };

        it( 'metadata', function( done ) {
            // Given
            var metadata = metadata1;

            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {

                var $input = $layout.find( '.pl-text-box-input' );

                assert.equal( $input.val(), '2,22', 'binding and formatting is right' );

                $input.focus(); // тест иногда не срабатывает, потому что фокус находится вне окна => .focus() выполниться не может
                setTimeout( function() {
                    assert.equal( $input.val(), '2,222', 'mask is right' );
                    $layout.detach();
                    done();
                }, 10 );

            }
        } );

    } );

} );
