describe( 'ListEditorBase', function() {

    describe( 'ListBox as exemplar of ListEditorBase', function() {

        it( 'should apply value to control (single selecting mode)', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': { 'Id': 2, 'Display': '2G' } }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                var $items = $layout.find( '.pl-listbox-i' ),
                    $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );

                assert.lengthOf( $chosen, 1, 'length of chosen item is right' );
                assert.equal( $items.index( $chosen ), 1, 'index of chosen item is right' );

                view.close();
            }
        } );


        it( 'should apply value to control (multiply selecting mode)', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': [
                                    { 'Id': 2, 'Display': '2G' },
                                    { 'Id': 3, 'Display': '2G' }
                                ] }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'MultiSelect': true,
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $layout ) {
                $layout.detach();

                var $items = $layout.find( '.pl-listbox-i' ),
                    $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );

                assert.lengthOf( $chosen, 2, 'length of chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 0 ) ), 1, 'index of first chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 1 ) ), 2, 'index of second chosen item is right' );

                view.close();
            }
        } );

        it( 'should apply value from control (single selecting)', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': null }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            function onViewReady( view, $layout ) {
                $layout.detach();


                var $items = $layout.find( '.pl-listbox-i' ),
                    $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );

                // Then
                assert.lengthOf( $chosen, 0, 'length of chosen item is right' );

                // When
                $items.first().find( '.pl-listbox-input input' ).prop( 'checked', true ).change();
                $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );

                // Then
                assert.lengthOf( $chosen, 1, 'length of chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 0 ) ), 0, 'index of first chosen item is right' );

                view.close();
            }
        } );

        it( 'should apply value from control (multiply selecting)', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': [{ 'Id': 2, 'Display': '2G' }] }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'MultiSelect': true,
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            function onViewReady( view, $layout ) {
                $layout.detach();

                var $items = $layout.find( '.pl-listbox-i' ),
                    $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' ),
                    value = view.getContext().dataSources[ 'ObjectDataSource2' ].getSelectedItem().Value;

                // Then
                assert.lengthOf( $chosen, 1, 'length of chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 0 ) ), 1, 'index of chosen item is right' );
                assert.lengthOf( value, 1, 'length value in DS is right' );
                assert.equal( value[ 0 ].Id, 2, 'value in DS is right' );

                // When
                $items.first().find( '.pl-listbox-input input' ).prop( 'checked', true ).change();
                $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );
                value = view.getContext().dataSources[ 'ObjectDataSource2' ].getSelectedItem().Value;

                assert.lengthOf( $chosen, 2, 'length of chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 0 ) ), 0, 'index of first chosen item is right' );
                assert.equal( $items.index( $chosen.eq( 1 ) ), 1, 'index of second chosen item is right' );

                assert.lengthOf( value, 2, 'length value in DS is right' );
                assert.equal( value[ 0 ].Id, 1, 'first value in DS is right' );
                assert.equal( value[ 1 ].Id, 2, 'second value in DS is right' );

                view.close();
            }
        } );

        it( 'should bind selectedItem and value', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': { 'Id': 2, 'Display': '2G' } }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            function onViewReady( view, $layout ) {
                var $items = $layout.find( '.pl-listbox-i' ),
                    $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' ),
                    $selected = $layout.find( '.pl-listbox-i.pl-listbox-i-selected' ),
                    ds = view.getContext().dataSources[ 'ObjectDataSource1' ],
                    ds2 = view.getContext().dataSources[ 'ObjectDataSource2' ],
                    selectedItem = ds.getSelectedItem(),
                    items = ds.getItems();

                // Then
                assert.lengthOf( $chosen, 1, 'length of chosen item is right' );
                assert.lengthOf( $selected, 0, 'length of selected item is right' );
                assert.isNull( selectedItem, 'value in DS is right' );
                assert.equal( ds2.getProperty( 'Value.Id' ), 2, 'selected item in DS is right' );

                // When
                $items.last().find( '.pl-listbox-input input' ).prop( 'checked', true ).change();
                $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );
                $selected = $layout.find( '.pl-listbox-i.pl-listbox-i-selected' );
                selectedItem = ds.getSelectedItem();

                // Then
                assert.lengthOf( $chosen, 1, 'length of chosen item is right (after changing)' );
                assert.lengthOf( $selected, 0, 'length of selected item is right (after changing)' );
                assert.equal( ds2.getProperty( 'Value.Id' ), 3, 'selected item in DS is right (after changing)' );

                // When
                ds.setSelectedItem( items[ 0 ] );
                $chosen = $layout.find( '.pl-listbox-i.pl-listbox-i-chosen' );
                $selected = $layout.find( '.pl-listbox-i.pl-listbox-i-selected' );
                selectedItem = ds.getSelectedItem();

                // Then
                assert.lengthOf( $chosen, 1, 'length of chosen item is right (after 2 changing)' );
                assert.lengthOf( $selected, 1, 'length of selected item is right (after 2 changing)' );
                assert.equal( selectedItem.Id, 1, 'value in DS is right (after 2 changing)' );
                assert.equal( ds2.getProperty( 'Value.Id' ), 3, 'selected item in DS is right (after 2 changing)' );

                view.close();
            }
        } );

        it( 'should set value by passed items', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource2',
                            'Items': [
                                { 'Value': 2 }
                            ]
                        }
                    }
                ],
                Items: [{

                    ListBox: {
                        'Name': 'LB',
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'ObjectDataSource1',
                                    'Property': '$.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'ObjectDataSource1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource2',
                            'Property': '$.Value'
                        },
                        'ValueProperty': 'Id'
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            function onViewReady( view, $layout ) {

                var listBox = view.getContext().controls[ 'LB' ];
                var firstItem = listBox.getItems().getByIndex( 0 );
                var value = listBox.getValue();
                assert.equal( value, 2, 'first value in listbox is right' );

                // When
                listBox.setValueItem( firstItem );

                // Then
                value = listBox.getValue();
                assert.equal( value, 1, 'setValueItem set value right' );

                view.close();
            }
        } );

        it( 'should use items from parameter', function() {
            // Given
            var metadata = {
                Text: 'Пациенты',
                Parameters: [{
                    'Name': 'Parameter1'
                }],
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Id': 1, 'Display': 'LTE' },
                                { 'Id': 2, 'Display': '2G' },
                                { 'Id': 3, 'Display': '2G' }
                            ]
                        }
                    }, {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1',
                            'Items': [
                                { 'Value': { 'Id': 2, 'Display': '2G' } }
                            ]
                        }
                    }
                ],
                'OnLoaded': '{context.parameters.Parameter1.setValue([{"Id": 1, "Display": "LTE"}, {"Id": 2, "Display": "2G"}, {"Id": 3, "Display": "2G"}]);}',
                Items: [{

                    ListBox: {
                        'ItemTemplate': {
                            'TextBox': {
                                'Name': 'TextBox1',
                                'Value': {
                                    'Source': 'Parameter1',
                                    'Property': '#.Display'
                                }
                            }
                        },
                        'Items': {
                            'Source': 'Parameter1',
                            'Property': ''
                        },
                        'Value': {
                            'Source': 'ObjectDataSource1',
                            'Property': '$.Value'
                        }
                    }
                }]
            };


            // When
            testHelper.applyViewMetadata( metadata, onViewReady );

            // Then
            function onViewReady( view, $view ) {
                assert.equal( $view.find( '.pl-listbox-i' ).length, 3 );

                view.close();
            }
        } );
    } );

} );
