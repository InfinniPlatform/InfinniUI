describe( 'TreeView', function() {

    describe( 'render', function() {
        it( 'should apply value to control (single selecting mode)', function() {
            // Given
            var metadata = {
                'DataSources': [
                    {
                        'ObjectDataSource': {
                            'Name': 'Geo',
                            'Items': [
                                {
                                    'Id': 1,
                                    'ParentId': null,
                                    'Name': 'Челябинск'
                                },
                                {
                                    'Id': 2,
                                    'ParentId': 1,
                                    'Name': 'Чичерина'
                                },
                                {
                                    'Id': 3,
                                    'ParentId': 1,
                                    'Name': 'Комарова'
                                },
                                {
                                    'Id': 4,
                                    'ParentId': null,
                                    'Name': 'Копейск'
                                },
                                {
                                    'Id': 5,
                                    'ParentId': 4,
                                    'Name': 'Победы'
                                },
                                {
                                    'Id': 6,
                                    'ParentId': 5,
                                    'Name': '33/1'
                                }
                            ]
                        }
                    }
                ],
                'Items': [
                    {
                        'TreeView': {
                            'KeyProperty': 'Id',
                            'ParentProperty': 'ParentId',
                            'ItemProperty': 'Name',
                            'ValueProperty': 'Name',
                            'MultiSelect': true,
                            'Items': {
                                'Source': 'Geo'
                            }
                        }
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata( metadata, function( view, $view ) {

                var $treeView = $view.find( '.pl-treeview' );
                var $treeViewNodes = $treeView.find( '.pl-treeview-node' );

                //Then
                assert.equal( $treeView.length, 1, 'TreeView rendered in View' );
                assert.equal( $treeViewNodes.length, 6, 'TreeViewNodes rendered' );

                view.close();
            } );

        } );
    } );

    describe( 'api', function() {
        it( 'should update DisabledItemCondition', function() {
            // Given
            var metadata = {
                'DataSources': [
                    {
                        'ObjectDataSource': {
                            'Name': 'Geo',
                            'Items': [
                                {
                                    'Id': 1,
                                    'ParentId': null,
                                    'Name': 'Челябинск'
                                },
                                {
                                    'Id': 2,
                                    'ParentId': 1,
                                    'Name': 'Чичерина'
                                },
                                {
                                    'Id': 3,
                                    'ParentId': 1,
                                    'Name': 'Комарова'
                                },
                                {
                                    'Id': 4,
                                    'ParentId': null,
                                    'Name': 'Копейск'
                                },
                                {
                                    'Id': 5,
                                    'ParentId': 4,
                                    'Name': 'Победы'
                                },
                                {
                                    'Id': 6,
                                    'ParentId': 5,
                                    'Name': '33/1'
                                }
                            ]
                        }
                    }
                ],
                'Items': [
                    {
                        'TreeView': {
                            'Name': 'TreeView1',
                            'DisabledItemCondition': '{ return (args.value.Id == 3); }',
                            'KeyProperty': 'Id',
                            'ParentProperty': 'ParentId',
                            'ItemProperty': 'Name',
                            'ValueProperty': 'Name',
                            'MultiSelect': true,
                            'Items': {
                                'Source': 'Geo'
                            }
                        }
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata( metadata, function( view, $view ) {

                var treeView = view.context.controls[ 'TreeView1' ];
                var nodes = $view.find( '.pl-treeview-node' );

                assert.isFalse( nodes.eq( 1 ).hasClass( 'pl-disabled-list-item' ), 'bad render for enabled item' );
                assert.isTrue( nodes.eq( 2 ).hasClass( 'pl-disabled-list-item' ), 'bad render for disabled item' );

                // When
                treeView.setDisabledItemCondition( function( context, args ) {
                    return args.value.Id == 2;
                } );

                // Then
                assert.isTrue( nodes.eq( 1 ).hasClass( 'pl-disabled-list-item' ), 'items not updated' );
                assert.isFalse( nodes.eq( 2 ).hasClass( 'pl-disabled-list-item' ), 'items not updated' );

                view.close();
            } );

        } );

        it( 'should trigger OnExpand and OnCollapse events', function() {
            // Given
            var counterExpand = 0;
            var counterCollapse = 0;
            window.treeViewExpandHandler = function() {
                counterExpand += 1;
            };
            window.treeViewCollapseHandler = function() {
                counterCollapse += 1;
            };
            var metadata = {
                'DataSources': [
                    {
                        'ObjectDataSource': {
                            'Name': 'Geo',
                            'Items': [
                                {
                                    'Id': 1,
                                    'ParentId': null,
                                    'Name': 'Челябинск'
                                },
                                {
                                    'Id': 2,
                                    'ParentId': 1,
                                    'Name': 'Чичерина'
                                },
                                {
                                    'Id': 3,
                                    'ParentId': 1,
                                    'Name': 'Комарова'
                                },
                                {
                                    'Id': 4,
                                    'ParentId': null,
                                    'Name': 'Копейск'
                                },
                                {
                                    'Id': 5,
                                    'ParentId': 4,
                                    'Name': 'Победы'
                                },
                                {
                                    'Id': 6,
                                    'ParentId': 5,
                                    'Name': '33/1'
                                }
                            ]
                        }
                    }
                ],
                'Items': [
                    {
                        'TreeView': {
                            'Name': 'TreeView3',
                            'KeyProperty': 'Id',
                            'ParentProperty': 'ParentId',
                            'ItemProperty': 'Name',
                            'ValueProperty': 'Name',
                            'MultiSelect': false,
                            'Items': {
                                'Source': 'Geo'
                            },
                            'OnExpand': '{ window.treeViewExpandHandler(); }',
                            'OnCollapse': '{ window.treeViewCollapseHandler(); }'
                        }
                    }
                ]
            };


            // When
            testHelper.applyViewMetadata( metadata, function( view, $view ) {

                var treeView = view.context.controls[ 'TreeView3' ];
                var buttons = $view.find( '.pl-treeview-node__button' );
                var firstBtn;

                assert.equal( counterExpand, 0, 'item is expanded' );
                assert.equal( counterCollapse, 0, 'item is collapsed' );

                // When
                buttons.each( function( i ) {
                    if( i == 0 ) {
                        firstBtn = $( this );
                        firstBtn.click();
                    }
                } );

                // Then
                assert.equal( counterExpand, 1, 'item is expanded' );

                firstBtn.click();

                assert.equal( counterCollapse, 1, 'item is collapsed' );

                view.close();
            } );

        } );
    } );

} );