InfinniUI.BindingModes = {
    twoWay: 'TwoWay',
    toSource: 'ToSource',
    toElement: 'ToElement'
};


var DataBinding = Backbone.Model.extend({
    defaults: {
        mode: InfinniUI.BindingModes.twoWay,
        converter: null,
        source: null,
        sourceProperty: null,
        element: null,
        elementProperty: null,
        defaultValue: null
    },

    getDefaultValue: function(){
        return this.get('defaultValue');
    },

    setDefaultValue: function(value){
        this.set('defaultValue', value);
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
        var logger = window.InfinniUI.global.logger;
        var element = this.getElement();

        if(this.get('source') != null){
            var message = stringUtils.format('DataBinding. bindSource: повторная инициализация. {0} заменен на {1}', [this.get('source').getName(), source.getName()]);
            logger.warn(message);
        }

        this.set('source', source);
        this.set('sourceProperty', property);

        var that = this;

        if(element){
            this._initPropertyOnElement();
        }

        source.onPropertyChanged(property, function(context, argument){
            that._onSourcePropertyChangedHandler(context, argument);
        });

        if( this._isWorkingWithSelectedItems(source) ){
            this._initBehaviorWithSelectedItem();
        }
    },

    _isWorkingWithSelectedItems: function(source){
        return typeof source.onSelectedItemChanged == 'function'
    },

    _initBehaviorWithSelectedItem: function(){
        var sourceProperty = this.get('sourceProperty');
        var source = this.get('source');
        var that = this;

        if(this._isRelativeProperty(sourceProperty)){
            source.onSelectedItemChanged(function(context, argument){
                var args = {
                    property: sourceProperty,
                    newValue: source.getProperty(sourceProperty)
                };
                that._onSourcePropertyChangedHandler(context, args);
            });
        }
    },

    _isRelativeProperty: function(property){
        return ! /^\d/.test(property) && property != '';
    },

    getSource: function () {
        return this.get('source');
    },

    getSourceProperty: function () {
        return this.get('sourceProperty');
    },


    bindElement: function (element, property) {
        var that = this;
        var logger = window.InfinniUI.global.logger;

        if(this.get('element') != null){
            var message = stringUtils.format('DataBinding. bindElement: повторная инициализация. {0} заменен на {1}', [this.get('element').getName(), element.getName()]);
            logger.warn(message);
        }

        this.set('element', element);
        this.set('elementProperty', property);

        element.onPropertyChanged(property, function(context, argument){
            that._onElementPropertyChangedHandler(context, argument);
        });

        this._initPropertyOnElement();
    },

    _initPropertyOnElement: function(){
        var sourceProperty = this.get('sourceProperty');
        var source = this.get('source');
        var value;

        if(this._shouldRefreshElement() && source){
            if(typeof source.isDataReady == 'function' && !source.isDataReady()){
                if(typeof source.tryInitData == 'function'){
                    if(this.getDefaultValue() !== null){
                        this._setValueToElement(this.getDefaultValue(), true);
                    }
                    source.tryInitData();
                }
                return;

            }else{
                value = source.getProperty(sourceProperty);
                this._setValueToElement(value);
            }
        }
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
    _onElementPropertyChangedHandler: function (context, argument) {
        if(this._shouldRefreshSource()){
            this._setValueToSource(argument.newValue, context);
        }
    },

    _setValueToSource: function(value, context){
        var element = this.get('element');
        var source = this.get('source');
        var sourceProperty = this.get('sourceProperty');
        var converter = this.get('converter');

        if(converter != null
            && converter.hasOwnProperty('toSource') //Mozilla's Object.prototype has method "toSource"!!
        ){
            value = converter.toSource(context, {value: value, binding: this, source: element});
        }

        source.setProperty(sourceProperty, value);
    },



    /**
     * @description Обработчик события изменения значения источника
     */
    _onSourcePropertyChangedHandler: function (context, argument) {
        if(this._shouldRefreshElement()){
            this._setValueToElement(argument.newValue);
        }
    },

    _setValueToElement: function(value, notConverting){
        var source = this.get('source');
        var element = this.get('element');
        var elementProperty = this.get('elementProperty');
        var converter = this.get('converter');
        var context = this._getContext();

        if(converter != null && converter.toElement != null && !notConverting){
            value = converter.toElement(context, {value: value, binding: this, source: source});
        }

        element.setProperty(elementProperty, value);
    },

    _getContext: function(){
        var source = this.getSource(),
            context;
        if(source.getView && source.getView()){
            context = source.getView().getContext();
        }

        return context;
    },

    _shouldRefreshSource: function(){
        var mode = this.get('mode');
        return mode == InfinniUI.BindingModes.twoWay || mode == InfinniUI.BindingModes.toSource;
    },

    _shouldRefreshElement: function(){
        var mode = this.get('mode');
        return mode == InfinniUI.BindingModes.twoWay || mode == InfinniUI.BindingModes.toElement;
    }
});

window.InfinniUI.DataBinding = DataBinding;
