describe( 'ScrollPanelControl', function() {

    describe( 'render', function() {
        it( 'Should render ScrollPanel', function() {

            // Given
            var metadata = {
                'DataSources': [
                    {
                        'ObjectDataSource': {
                            'Name': 'BloodGroupDataSource',
                            'Items': [
                                {
                                    'Id': 1,
                                    'DisplayName': 'I',
                                    'SomeField': ''
                                },
                                {
                                    'Id': 2,
                                    'DisplayName': 'II',
                                    'SomeField': 'val'
                                },
                                {
                                    'Id': 3,
                                    'DisplayName': 'III',
                                    'SomeField': 3
                                },
                                {
                                    'Id': 4,
                                    'DisplayName': 'IV',
                                    'SomeField': null
                                }
                            ]
                        }
                    }
                ],
                'Items': [
                    {
                        'TablePanel': {
                            'Name': '',
                            'Items': [
                                {
                                    'Row': {
                                        'Items': [
                                            {
                                                'Cell': {
                                                    'ColumnSpan': 3,
                                                    'Items': [
                                                        {
                                                            'ScrollPanel': {
                                                                'Name': 'ScrollPanel_1',
                                                                'Items': [{
                                                                    'Label': {
                                                                        'Text': 'Label 1'
                                                                    }
                                                                },
                                                                {
                                                                    'Label': {
                                                                        'Text': 'Label 2'
                                                                    }
                                                                },
                                                                {
                                                                    'Label': {
                                                                        'Text': 'Label 3'
                                                                    }
                                                                },
                                                                {
                                                                    'Label': {
                                                                        'Text': 'Label 4'
                                                                    }
                                                                }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();
                var
                    $panel = $layout.find( '.pl-scrollpanel' ),
                    $body = $panel.find( '.pl-scrollpanel-body' ),
                    $content = $body.find( '.pl-scrollpanel-i' );

                assert.equal( $panel.length, 1, 'container' );
                assert.equal( $body.length, 1, 'body' );
                assert.equal( $content.length, 4, 'items' );

                assert.isTrue( $panel.hasClass( 'pl-horizontal-scroll-auto' ) );
                assert.isTrue( $panel.hasClass( 'pl-vertical-scroll-auto' ) );
            }
        } );
    } );
} );