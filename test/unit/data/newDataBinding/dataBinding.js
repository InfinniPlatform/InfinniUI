describe('DataBinding', function () {
    it('should bind source', function () {
        // Given
        var dataBinding = new DataBinding();

        assert.isNull(dataBinding.getSource());
        assert.isNull(dataBinding.getSourceProperty());

        // When
        dataBinding.bindSource(new FakeElement(), 'property');

        // Then
        assert.isNotNull(dataBinding.getSource());
        assert.isNotNull(dataBinding.getSourceProperty());
    });

    it('should bind element', function () {
        // Given
        var dataBinding = new DataBinding();

        assert.isNull(dataBinding.getElement());
        assert.isNull(dataBinding.getElementProperty());

        // When
        dataBinding.bindElement(new FakeElement(), 'property');

        // Then
        assert.isNotNull(dataBinding.getElement());
        assert.isNotNull(dataBinding.getElementProperty());
    });

    it('default mode should be twoWay', function () {
        // Given
        var dataBinding = new DataBinding();

        // Then
        assert.equal(dataBinding.getMode(), BINDING_MODES.twoWay, 'default mode must be twoWay');
    });

    it('should refresh source on element change if mode is twoWay', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.twoWay);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        element.setProperty(elementProperty, 'element property new value' );

        // Then
        assert.equal(dataBinding.getSource().getProperty(sourceProperty), 'element property new value');
    });

    it('should refresh element on source change if mode is twoWay', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.twoWay);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        source.setProperty(sourceProperty, 'source property new value' );

        // Then
        assert.equal(dataBinding.getElement().getProperty(elementProperty), 'source property new value');
    });

    it('should not refresh source on element change if mode is toElement', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.toElement);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        element.setProperty(elementProperty, 'element property new value' );

        // Then
        assert.equal(dataBinding.getSource().getProperty(sourceProperty), 'source property start value');
    });

    it('should refresh element on source change if mode is toElement', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.toElement);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        source.setProperty(sourceProperty, 'source property new value' );

        // Then
        assert.equal(dataBinding.getElement().getProperty(elementProperty), 'source property new value');
    });

    it('should refresh source on element change if mode is toSource', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.toSource);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        element.setProperty(elementProperty, 'element property new value' );

        // Then
        assert.equal(dataBinding.getSource().getProperty(sourceProperty), 'element property new value');
    });

    it('should not refresh element on source change if mode is toSource', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.toSource);

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';
        source.setProperty(sourceProperty, 'source property start value');

        var element = new FakeElement();
        var elementProperty = 'elementProperty';
        element.setProperty(elementProperty, 'element property start value');

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        source.setProperty(sourceProperty, 'source property new value' );

        // Then
        assert.equal(dataBinding.getElement().getProperty(elementProperty), 'element property start value');
    });

    it('should convert value if have converter', function () {
        // Given
        var dataBinding = new DataBinding();
        dataBinding.setMode(BINDING_MODES.twoWay);
        dataBinding.setConverter({
            toSource: function(context, argument) {
                return argument.value ? 5 : 3; // string to integer
            },
            toElement: function(context, argument) {
                return argument.value > 4; // integer to string
            }
        });

        var source = new FakeElement();
        var sourceProperty = 'sourceProperty';

        var element = new FakeElement();
        var elementProperty = 'elementProperty';

        dataBinding.bindSource(source, sourceProperty);
        dataBinding.bindElement(element, elementProperty);

        // When
        source.setProperty(sourceProperty, 5);

        // Then
        assert.equal(dataBinding.getElement().getProperty(elementProperty), true, 'Ignored toElement converter');

        // When
        element.setProperty(elementProperty, false);

        // Then
        assert.equal(dataBinding.getSource().getProperty(sourceProperty), 3, 'Ignored toSource converter');
    });
});