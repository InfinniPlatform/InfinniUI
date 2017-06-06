describe( 'TabPanelControl', function() {

    describe( 'render', function() {
        it( 'Should render TabPanel with 3 TabPages', function() {

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
                        'TabPanel': {
                            'OnSelectedItemChanged': 'OnSelectedItemChanged',
                            'HeaderLocation': 'Left',
                            'Items': [
                                {
                                    'TabPage': {
                                        'Text': 'Header of Page1',
                                        'Items': [
                                            {
                                                'Label': {
                                                    'Text': 'Content of Page1'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    'TabPage': {
                                        'Text': 'Header of Page2',
                                        'CanClose': true,
                                        'OnClosing': 'OnClosing',
                                        'OnClosed': 'OnClosed2',
                                        'Items': [
                                            {
                                                'Label': {
                                                    'Text': 'Content of Page2'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    'TabPage': {
                                        'Text': 'Header of Page3',
                                        'CanClose': true,
                                        'Items': [
                                            {
                                                'Label': {
                                                    'Text': 'Content of Page3'
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                'Scripts': [
                    {
                        'Name': 'OnClosing',
                        'Body': 'var defer = $.Deferred(); setTimeout(function () {defer.resolve(\'ok\');}, 3000); return defer.promise();'
                    },
                    {
                        'Name': 'OnClosed2',
                        'Body': 'console.log(\'OnClosed2\');'
                    },
                    {
                        'Name': 'OnSelectedItemChanged',
                        'Body': 'console.log(\'OnSelectedItemChanged\');'
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();
                var
                    $panel = $layout.find( '.pl-tabpanel' ),
                    $header = $layout.find( '.pl-tabpanel-header' ),
                    $content = $layout.find( '.pl-tabpanel-content' ),

                    $headers = $header.find( '.pl-tabheader' ),
                    $pages = $content.find( '.pl-tabpage' );

                assert.equal( $panel.length, 1, 'container' );
                assert.equal( $header.length, 1, 'header' );
                assert.equal( $content.length, 1, 'content' );
                assert.equal( $headers.length, 3, 'headers' );
                assert.equal( $pages.length, 3, 'pages' );
            }
        } );
    } );
} );