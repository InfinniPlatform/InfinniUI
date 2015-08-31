describe('DataBindingBuilder', function () {
    it('should build DataBinding', function () {
        // Given
        var dataBindingBuilder = new DataBindingBuilder();
        var view = {
            getContext: function(){
                return {
                    dataSources: {
                        My_Source: {
                            onPropertyChanged: function(){}
                        }
                    },
                    parameters: {
                    },
                    controls: {
                    }
                };
            }
        };
        var metadata = {
            Source: 'My_Source',
            Property: '',
            Mode: 'ToSource',
            Converter: {
                toSource: function(){},
                toElement: function(){}
            }
        };

        // When
        var dataBinding = dataBindingBuilder.build(null, view, metadata);

        // Then
        assert.equal(dataBinding.getMode(), BindingModes.toSource);
        assert.isNotNull(dataBinding.getConverter());
        assert.isNotNull(dataBinding.getSource());
        assert.isNotNull(dataBinding.getSourceProperty());
    });

    it('should bind all type of source', function () {
        // Given
        var dataBindingBuilder = new DataBindingBuilder();
        var view = {
            getContext: function(){
                return {
                    dataSources: {
                        My_DataSource: {
                            onPropertyChanged: function(){}
                        }
                    },
                    parameters: {
                        My_Parameter: {
                            onPropertyChanged: function(){}
                        }
                    },
                    controls: {
                        My_Button: {
                            onPropertyChanged: function(){}
                        }
                    }
                };
            }
        };

        // Then
        dataBindingBuilder.build(null, view, { Source: 'My_DataSource'});
        dataBindingBuilder.build(null, view, { Source: 'My_Parameter'});
        dataBindingBuilder.build(null, view, { Source: 'My_Button'});
    });
});
