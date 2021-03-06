describe( 'TextEditorBase (Element)', function() {
    describe( 'Textbox as exemplar of TextEditorBase', function() {
        var metadata1 = {
            Text: '��������',
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
                    'DisplayFormat': '${:n2}',

                    'EditMask': {
                        'NumberEditMask': {
                            'Mask': 'n3'
                        }
                    }
                }
            }]
        };

        it( 'Base functional', function() {
            // Given
            var textBox = new InfinniUI.TextBox();
            var format = function( context, args ) {
                var format = new InfinniUI.ObjectFormat();
                return format.format( args.value );
            };

            assert.isNull( textBox.getLabelText(), 'default label text is null' );
            assert.isFalse( textBox.getLabelFloating(), 'default label floating is false' );
            assert.isNull( textBox.getDisplayFormat(), 'default display format is null' );
            assert.isNull( textBox.getEditMask(), 'default edit mask is null' );


            // When
            textBox.setLabelText( 'label' );
            textBox.setLabelFloating( true );
            textBox.setDisplayFormat( format );


            // Then
            assert.equal( textBox.getLabelText(), 'label', 'new label text is right' );
            assert.isTrue( textBox.getLabelFloating(), 'new label floating is true' );
            assert.equal( textBox.getDisplayFormat(), format, 'new display format is right' );
        } );


        it( 'Building TextEditorBase (Textbox) by Metadata', function() {
            // Given
            var metadata = metadata1;

            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                var textbox = view.getContext().controls[ 'TextBox1' ];
                var formatter = textbox.getDisplayFormat();

                assert.equal( formatter( null, { value: 2.22222 } ), '2,22', 'applied format is right (n2)' );
            }
        } );

    } );

} );
