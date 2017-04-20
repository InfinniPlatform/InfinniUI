describe( 'DataBindingBuilder', function() {

    it( 'should build DataBinding', function() {
        // Given
        var dataBindingBuilder = new InfinniUI.DataBindingBuilder();
        var view = {
            getDeferredOfMember: function() {
                return {
                    done: function( handler ) {
                        handler( {
                            onPropertyChanged: function() {}
                        } );
                    }
                };
            }
        };
        var metadata = {
            Source: 'My_Source',
            Property: 'Property',
            Mode: 'ToSource',
            DefaultValue: 'DefaultValue',
            Converter: {
                toSource: function() {},
                toElement: function() {}
            }
        };

        // When
        var dataBinding = dataBindingBuilder.build( null, { parentView: view, metadata: metadata } );

        // Then
        assert.equal( dataBinding.getMode(), InfinniUI.BindingModes.toSource );
        assert.equal( dataBinding.getDefaultValue(), 'DefaultValue' );
        assert.isObject( dataBinding.getConverter() );
        assert.isObject( dataBinding.getSource() );
        assert.equal( dataBinding.getSourceProperty(), 'Property' );
    } );

    describe( 'should bind all type of source', function() {

        it( 'should bind dataSource', function() {
            // Given
            var viewMetadata = {
                DataSources: [
                    {
                        ObjectDataSource: {
                            'Name': 'ObjectDataSource1'
                        }
                    }
                ]
            };

            testHelper.applyViewMetadata( viewMetadata, onViewReady );

            function onViewReady( view, $view ) {
                var bindingMetadata = {
                    Source: 'ObjectDataSource1'
                };

                // When
                var dataBinding = new InfinniUI.DataBindingBuilder().build( null, { parentView: view, metadata: bindingMetadata } ),
                    bindingSource = dataBinding.getSource();

                // Then
                assert.isDefined( bindingSource );
                assert.instanceOf( bindingSource, InfinniUI.ObjectDataSource );

                view.close();
            }
        } );

        it( 'should bind parameter', function() {
            // Given
            var viewMetadata = {
                Parameters: [
                    {
                        Name: 'Parameter1'
                    }
                ]
            };

            testHelper.applyViewMetadata( viewMetadata, onViewReady );

            function onViewReady( view, $view ) {
                var bindingMetadata = {
                    Source: 'Parameter1'
                };

                // When
                var dataBinding = new InfinniUI.DataBindingBuilder().build( null, { parentView: view, metadata: bindingMetadata } ),
                    bindingSource = dataBinding.getSource();

                // Then
                assert.isDefined( bindingSource );
                assert.instanceOf( bindingSource, InfinniUI.Parameter );

                view.close();
            }
        } );

        it( 'should bind element', function() {
            // Given
            var viewMetadata = {
                Items: [
                    {
                        Label: {
                            Name: 'Element1'
                        }
                    }
                ]
            };

            testHelper.applyViewMetadata( viewMetadata, onViewReady );

            function onViewReady( view, $view ) {
                var bindingMetadata = {
                    Source: 'Element1',
                    Property: 'value'
                };

                // When
                var dataBinding = new InfinniUI.DataBindingBuilder().build( null, { parentView: view, metadata: bindingMetadata } ),
                    bindingSource = dataBinding.getSource();

                // Then
                assert.isDefined( bindingSource );
                assert.instanceOf( bindingSource, InfinniUI.Element );

                view.close();
            }
        } );

    } );

    it( 'should toElement converter work in inline style', function() {
        // Given
        var viewMetadata = {
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
            Items: [{

                StackPanel: {
                    Name: 'MainViewPanel',
                    'ItemTemplate': {
                        'TextBox': {
                            'Name': 'TextBox1',
                            'Value': {
                                'Source': 'ObjectDataSource1',
                                'Property': '#.Display',
                                'Converter': {
                                    'ToElement': '{return args.value + \'!\';}'
                                },
                                'Mode': 'ToElement'
                            }
                        }
                    },
                    'Items': {
                        'Source': 'ObjectDataSource1',
                        'Property': ''
                    }
                }
            }]
        };

        // When
        testHelper.applyViewMetadata( viewMetadata, onViewReady );

        // Then
        function onViewReady( view, $view ) {
            assert.equal( $view.find( '.pl-text-box-input:first' ).val(), 'LTE!', 'binding in itemTemplate is right' );

            view.close();
        }
    } );
} );
