describe( 'EditAction', function() {
    it( 'successful build', function() {
        // Given
        var view = new InfinniUI.View();
        var builder = new InfinniUI.ApplicationBuilder();
        var dataSource = new InfinniUI.ObjectDataSource( { name: 'SomeDS', view: view } );

        view.getDataSources().push( dataSource );

        var metadata = {
            EditAction: {
                LinkView: {
                    InlineView: {

                    }
                },
                DestinationValue: {
                    Source: 'SomeDS'
                },
                SourceValue: {
                    Source: 'EditDS'
                }
            }
        };

        // When
        var editAction = builder.build( metadata, { parentView: view } );

        // Then
        assert.isNotNull( editAction );
        assert.isNotNull( editAction.execute, 'action should have execute' );
    } );

    it( 'should edit document from ObjectDataSource', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'IsLazy': false,
                        'Items': [
                            {
                                '_id': 1,
                                'Name': 'OldValue'
                            }
                        ]
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'DestinationValue': {
                                'Source': 'ObjectDataSource',
                                'Property': '0'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'ObjectDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'TextBox': {
                                                    'Name': 'NameTextBox',
                                                    'Value': {
                                                        'Source': 'MainDataSource',
                                                        'Property': '$.Name'
                                                    }
                                                }
                                            },
                                            {
                                                'Button': {
                                                    'Name': 'AcceptBtn',
                                                    'Action': {
                                                        'AcceptAction': {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var edtBtn = view.context.controls[ 'EditButton' ];
            var destinationDS = view.context.dataSources[ 'ObjectDataSource' ];

            assert.equal( destinationDS.getItems().length, 1 );
            assert.equal( destinationDS.getItems()[ 0 ].Name, 'OldValue' );

            // When
            edtBtn.click();

            var childView = view.context.controls[ 'EditView' ];
            var nameTextBox = childView.context.controls[ 'NameTextBox' ];
            var acceptBtn = childView.context.controls[ 'AcceptBtn' ];

            nameTextBox.setValue( 'NewValue' );

            acceptBtn.click();

            // Then
            assert.equal( destinationDS.getItems().length, 1, 'edit action should not add items' );
            assert.equal( destinationDS.getItems()[ 0 ].Name, 'NewValue' );

            done();
            view.close();
        } );
    } );

    it( 'should edit array item in document from ObjectDataSource', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'IsLazy': false,
                        'Items': [
                            {
                                '_id': 1,
                                'People': [
                                    {
                                        '_id': 10,
                                        'Name': 'OldValue'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'DestinationValue': {
                                'Source': 'ObjectDataSource',
                                'Property': '0.People.0'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'ObjectDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'TextBox': {
                                                    'Name': 'NameTextBox',
                                                    'Value': {
                                                        'Source': 'MainDataSource',
                                                        'Property': '$.Name'
                                                    }
                                                }
                                            },
                                            {
                                                'Button': {
                                                    'Name': 'AcceptBtn',
                                                    'Action': {
                                                        'AcceptAction': {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var edtBtn = view.context.controls[ 'EditButton' ];
            var destinationDS = view.context.dataSources[ 'ObjectDataSource' ];

            assert.equal( destinationDS.getItems()[ 0 ].People.length, 1 );
            assert.equal( destinationDS.getItems()[ 0 ].People[ 0 ].Name, 'OldValue' );

            // When
            edtBtn.click();

            var childView = view.context.controls[ 'EditView' ];
            var nameTextBox = childView.context.controls[ 'NameTextBox' ];
            var acceptBtn = childView.context.controls[ 'AcceptBtn' ];

            nameTextBox.setValue( 'NewValue' );

            acceptBtn.click();

            // Then
            assert.equal( destinationDS.getItems()[ 0 ].People.length, 1, 'edit action should not add items' );
            assert.equal( destinationDS.getItems()[ 0 ].People[ 0 ].Name, 'NewValue' );

            done();
            view.close();
        } );
    } );

    it( 'should edit document from DocumentDataSource', function( done ) {
        // Given
        InfinniUI.providerRegister.register( 'DocumentDataSource', StaticFakeDataProvider );

        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'DocumentDataSource': {
                        'Name': 'DocumentDataSource',
                        'IsLazy': false
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'DestinationValue': {
                                'Source': 'DocumentDataSource',
                                'Property': '0'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'DocumentDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'Button': {
                                                    'Name': 'SaveBtn',
                                                    'Action': {
                                                        'SaveAction': {
                                                            'DestinationValue': {
                                                                'Source': 'MainDataSource'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            view.context.dataSources.DocumentDataSource.updateItems(
                function() {
                    var edtBtn = view.context.controls[ 'EditButton' ];
                    var destinationDS = view.context.dataSources.DocumentDataSource;

                    assert.isUndefined( destinationDS.getSelectedItem().isNewValueForTest );

                    // When
                    edtBtn.click();

                    var childView = view.context.controls[ 'EditView' ];
                    var sourceDS = childView.context.dataSources[ 'MainDataSource' ];
                    var saveBtn = childView.context.controls[ 'SaveBtn' ];

                    // что если setSelectedItem сработает раньше? мб лучше setTimeout?
                    sourceDS.onSelectedItemChanged( function() {
                        var editItem = sourceDS.getSelectedItem();
                        editItem.isNewValueForTest = true;
                        sourceDS.setSelectedItem( editItem );

                        saveBtn.click();

                        // Then
                        setTimeout( function() {
                            assert.isTrue( destinationDS.getSelectedItem().isNewValueForTest );
                            done();
                            view.close();
                        }, 250 );
                    } );
                }
            );
        } );
    } );

    it( 'should not open edit view when edit item is null if edit item is document', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'IsLazy': false,
                        'Items': [
                        ]
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'DestinationValue': {
                                'Source': 'ObjectDataSource',
                                'Property': '$'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'ObjectDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'Button': {
                                                    'Name': 'AcceptBtn',
                                                    'Action': {
                                                        'AcceptAction': {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var edtBtn = view.context.controls[ 'EditButton' ];

            // When
            edtBtn.click();

            var childView = view.context.controls[ 'EditView' ];

            // Then
            assert.isTrue( childView.isClosing );

            done();
            view.close();
        } );
    } );

    it( 'should open edit view when edit item is null if edit item is property', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'IsLazy': false,
                        'Items': [
                            {
                                'Id': '1',
                                'Address': null
                            }
                        ]
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'DestinationValue': {
                                'Source': 'ObjectDataSource',
                                'Property': '$.Address'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'ObjectDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'Button': {
                                                    'Name': 'AcceptBtn',
                                                    'Action': {
                                                        'AcceptAction': {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var edtBtn = view.context.controls[ 'EditButton' ];
            var destinationDS = view.context.dataSources[ 'ObjectDataSource' ];

            assert.isNull( destinationDS.getProperty( '$.Address' ) );

            // When
            edtBtn.click();

            var childView = view.context.controls[ 'EditView' ];
            var acceptBtn = childView.context.controls[ 'AcceptBtn' ];

            acceptBtn.click();

            // Then
            assert.isNotNull( destinationDS.getProperty( '$.Address' ) );

            done();
            view.close();
        } );
    } );

    it( 'should call onExecuted', function( done ) {
        // Given
        var metadata = {
            'Text': 'Parent View',
            'DataSources': [
                {
                    'ObjectDataSource': {
                        'Name': 'ObjectDataSource',
                        'IsLazy': false,
                        'Items': [
                            {
                                'Name': 'OldValue'
                            }
                        ]
                    }
                }
            ],
            'Items': [{
                'Button': {
                    'Name': 'EditButton',
                    'Action': {
                        'EditAction': {
                            'OnExecuted': '{ window.onExecutedWasCalled = true; }',
                            'DestinationValue': {
                                'Source': 'ObjectDataSource',
                                'Property': '0'
                            },
                            'SourceValue': {
                                'Source': 'MainDataSource'
                            },
                            'LinkView': {
                                'InlineView': {
                                    'OpenMode': 'Dialog',
                                    'View': {
                                        'Text': 'Edit',
                                        'Name': 'EditView',
                                        'DataSources': [
                                            {
                                                'ObjectDataSource': {
                                                    'Name': 'MainDataSource'
                                                }
                                            }
                                        ],
                                        'Items': [
                                            {
                                                'Button': {
                                                    'Name': 'AcceptBtn',
                                                    'Action': {
                                                        'AcceptAction': {
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var edtBtn = view.context.controls[ 'EditButton' ];
            var destinationDS = view.context.dataSources[ 'ObjectDataSource' ];

            // When
            edtBtn.click();

            var childView = view.context.controls[ 'EditView' ];
            var acceptBtn = childView.context.controls[ 'AcceptBtn' ];

            assert.isUndefined( window.onExecutedWasCalled );

            acceptBtn.click();

            // Then
            assert.isTrue( window.onExecutedWasCalled );

            done();

            // cleanup
            window.onExecutedWasCalled = undefined;
            view.close();
        } );
    } );
} );
