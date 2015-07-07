var BindingModes = {
    twoWay: 'TwoWay',
    toSource: 'ToSource',
    toElement: 'ToElement'
};


var DataBinding = Backbone.Model.extend({
    defaults: {
        mode: BindingModes.twoWay,
        converter: null,
        source: null,
        sourceProperty: null,
        element: null,
        elementProperty: null
    },


    setMode: function (mode) {
        this.set('mode', mode);
    },

    getMode: function () {
        return this.get('mode');
    },


    setConverter: function (converter) {
        this.set('converter', converter);
    },

    getConverter: function () {
        return this.get('converter');
    },


    bindSource: function (source, property) {
        if(this.get('source') != null){
            var message = stringUtils.format('DataBinding. bindSource: повторная инициализация. {0} заменен на {1}', [this.get('source').getName(), source.getName()])
            logger.warn(message);
        }

        this.set('source', source);
        this.set('sourceProperty', property);

        var that = this;
        source.onPropertyChanged(function(context, argument){
            that.onSourcePropertyChangedHandler(context, argument);
        });
    },

    getSource: function () {
        return this.get('source');
    },

    getSourceProperty: function () {
        return this.get('sourceProperty');
    },


    bindElement: function (element, property) {
        if(this.get('element') != null){
            var message = stringUtils.format('DataBinding. bindElement: повторная инициализация. {0} заменен на {1}', [this.get('element').getName(), element.getName()])
            logger.warn(message);
        }

        this.set('element', element);
        this.set('elementProperty', property);

        var that = this;
        element.onPropertyChanged(function(context, argument){
            that.onElementPropertyChangedHandler(context, argument);
        });
    },

    getElement: function () {
        return this.get('element');
    },

    getElementProperty: function () {
        return this.get('elementProperty');
    },

    /**
     * @description Обработчик события изменения значения элемента
     */
    onElementPropertyChangedHandler: function (context, argument) {
        var mode = this.get('mode');
        var source = this.get('source');
        var sourceProperty = this.get('sourceProperty');
        var element = this.get('element');
        var elementProperty = this.get('elementProperty');

        if(this.shouldRefreshSource(mode) && argument.property == elementProperty){
            var value = element.getProperty(elementProperty);
            var converter = this.get('converter');

            if(converter != null && converter.toSource != null){
                value = converter.toSource(context, {value: value});
            }

            source.setProperty(sourceProperty, value);
        }
    },

    /**
     * @description Обработчик события изменения значения источника
     */
    onSourcePropertyChangedHandler: function (context, argument) {
        var mode = this.get('mode');
        var source = this.get('source');
        var sourceProperty = this.get('sourceProperty');
        var element = this.get('element');
        var elementProperty = this.get('elementProperty');

        if(this.shouldRefreshElement(mode) && argument.property == sourceProperty){
            var value = source.getProperty(sourceProperty);
            var converter = this.get('converter');

            if(converter != null && converter.toElement != null){
                value = converter.toElement(context, {value: value});
            }

            element.setProperty(elementProperty, value);
        }
    },

    shouldRefreshSource: function(mode){
        return mode == BindingModes.twoWay || mode == BindingModes.toSource;
    },

    shouldRefreshElement: function(mode){
        return mode == BindingModes.twoWay || mode == BindingModes.toElement;
    }
});