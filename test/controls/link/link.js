describe( 'Link (Control)', function() {

    describe( 'Check href and target params in LinkElement', function() {

        it( 'should update from default href attribute', function() {
			// Given
            var metadata = {
                Items: [
                    {
                        Link: {

                        }
                    }
                ]
            };

			// When
            testHelper.applyViewMetadata( metadata, onViewReady );

			// Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                assert.equal( $layout.find( '.pl-link' ).attr( 'href' ), 'javascript:;', 'attribute href is right' );

                view.childElements[ 0 ].setHref( 'common.ru' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'href' ), 'common.ru', 'attribute href is right' );

                view.childElements[ 0 ].setHref( 'example.com' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'href' ), 'example.com', 'attribute href is right' );
            }
        } );

        it( 'should update from default target attribute', function() {
			// Given
            var metadata = {
                Items: [
                    {
                        Link: {

                        }
                    }
                ]
            };

			// When
            testHelper.applyViewMetadata( metadata, onViewReady );

			// Then
            function onViewReady( view, $layout ) {
                $layout.detach();


                assert.equal( $layout.find( '.pl-link' ).attr( 'target' ), '_self', 'attribute target is right' );

                view.childElements[ 0 ].setTarget( 'blank' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'target' ), '_blank', 'attribute target is right' );
            }
        } );

        it( 'should apply href and target attributes from metadata', function() {
			// Given
            var metadata = {
                Items: [
                    {
                        Link: {
                            'Href': 'http://example.com',
                            'Target': 'top'
                        }
                    }
                ]
            };

			// When
            testHelper.applyViewMetadata( metadata, onViewReady );

			// Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                assert.equal( $layout.find( '.pl-link' ).attr( 'href' ), 'http://example.com', 'attribute href is right' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'target' ), '_top', 'attribute target is right' );

                view.childElements[ 0 ].setHref( 'http://exampleNew.com' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'href' ), 'http://exampleNew.com', 'attribute href is right' );

                view.childElements[ 0 ].setTarget( 'blank' );
                assert.equal( $layout.find( '.pl-link' ).attr( 'target' ), '_blank', 'attribute target is right' );
            }
        } );
    } );
} );
