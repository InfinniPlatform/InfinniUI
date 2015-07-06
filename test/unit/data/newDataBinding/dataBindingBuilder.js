describe('DataBindingBuilder', function () {
    it('should build DataBinding', function () {
        // Given
        var dataBindingBuilder = new DataBindingBuilder();
        var view = {
            context: {
                My_Source:{
                    onPropertyChanged: function(){}
                }
            }
        };
        var metadata = {
            Source: 'My_Source',
            Property: '',
            Mode: 'toSource',
            Converter: {
                toSource: function(){},
                toElement: function(){}
            }
        };

        // When
        var dataBinding = dataBindingBuilder.build(null, view, metadata);

        // Then
        assert.equal(dataBinding.getMode(), BINDING_MODES.toSource);
        assert.isNotNull(dataBinding.getConverter());
        assert.isNotNull(dataBinding.getSource());
        assert.isNotNull(dataBinding.getSourceProperty());
    });
});
