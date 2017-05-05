describe( 'ContextMenu (Control)', function() {

    describe( 'Remove element from ListBox by clicking on button from ContextMenu', function() {

        it( 'should remove selected item from DS', function() {
			// Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
								{ 'Id': 1, 'Display': 'LTE' },
								{ 'Id': 2, 'Display': '3G' },
								{ 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }
                ],
                Items: [
                    {
                        ListBox: {
                            ViewMode: 'common',
                            ItemProperty: 'Display',
                            Items: {
                                Source: 'ObjectDataSource1'
                            },
                            'ItemTemplate': {
                                'Label': {
                                    'Value': {
                                        'Source': 'ObjectDataSource1',
                                        'Property': '#.Display'
                                    }
                                }
                            },
                            ContextMenu: {
                                Items: [
                                    {
                                        Button: {
                                            ViewMode: 'link',
                                            Text: 'RemoveElement',
                                            Action: {
                                                DeleteAction: {
                                                    DestinationValue: {
                                                        Source: 'ObjectDataSource1',
                                                        Property: '$'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            };

			// When
            testHelper.applyViewMetadata( metadata, onViewReady );

			// Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                $( $layout.find( '.pl-listbox-i' )[ 1 ] ).trigger( 'click' );
                view.childElements[ 0 ].childElements[ 0 ].childElements[ 0 ].click();
                $( 'a[data-index=0]' ).trigger( 'click' );
                assert.lengthOf( $layout.find( '.pl-listbox-i' ), 2, 'length of rest items in listbox' );
                assert.equal( $layout.find( '.pl-listbox-i:nth-child(1) span[title]' ).text(), 'LTE', 'binding in itemTemplate is right' );
                assert.equal( $layout.find( '.pl-listbox-i:nth-child(2) span[title]' ).text(), '2G', 'binding in itemTemplate is right' );
            }
        } );
    } );
} );
