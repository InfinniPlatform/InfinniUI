InfinniUI.BindingModes = {
    twoWay: 'TwoWay',
    toSource: 'ToSource',
    toElement: 'ToElement'
};

/**
 * @constructor
 * @augments Backbone.Model
 */
var DataBinding = Backbone.Model.extend( {

    defaults: {
        mode: InfinniUI.BindingModes.twoWay,
        converter: null,
        source: null,
        sourceProperty: null,
        element: null,
        elementProperty: null,
        defaultValue: null
    },

    /**
     * @returns {*}
     */
    getDefaultValue: function() {
        return this.get( 'defaultValue' );
    },

    /**
     *
     * @param value
     */
    setDefaultValue: function( value ) {
        this.set( 'defaultValue', value );
    },

    /**
     *
     * @param mode
     */
    setMode: function( mode ) {
        this.set( 'mode', mode );
    },

    /**
     * @returns {*}
     */
    getMode: function() {
        return this.get( 'mode' );
    },

    /**
     *
     * @param converter
     */
    setConverter: function( converter ) {
        this.set( 'converter', converter );
    },

    /**
     * @returns {*}
     */
    getConverter: function() {
        return this.get( 'converter' );
    },

    /**
     *
     * @param source
     * @param property
     */
    bindSource: function( source, property ) {
        var logger = InfinniUI.global.logger;
        var element = this.getElement();

        if( this.get( 'source' ) !== null && typeof this.get( 'source' ) !== 'undefined' ) {
            var message = stringUtils.format( 'DataBinding. bindSource: повторная инициализация. {0} заменен на {1}', [ this.get( 'source' ).getName(), source.getName() ] );

            logger.warn( message );
        }

        this.set( 'source', source );
        this.set( 'sourceProperty', property );

        var that = this;

        if( element ) {
            this._initPropertyOnElement();
        }

        var bindId = source.onPropertyChanged( property, function( context, argument ) {
            that._onSourcePropertyChangedHandler( context, argument );
        } );

        this.set( 'bindId', bindId );

        if( this._isWorkingWithSelectedItems( source ) ) {
            this._initBehaviorWithSelectedItem();
        }
    },

    /**
     *
     * @param source
     * @returns {boolean}
     * @private
     */
    _isWorkingWithSelectedItems: function( source ) {
        return typeof source.onSelectedItemChanged === 'function';
    },

    /**
     *
     * @private
     */
    _initBehaviorWithSelectedItem: function() {
        var sourceProperty = this.get( 'sourceProperty' );
        var source = this.get( 'source' );
        var that = this;

        if( this._isRelativeProperty( sourceProperty ) ) {
            source.onSelectedItemChanged( function( context, argument ) {
                var args = {
                    property: sourceProperty,
                    newValue: source.getProperty( sourceProperty )
                };
                that._onSourcePropertyChangedHandler( context, args );
            } );
        }
    },

    /**
     *
     * @param property
     * @returns {boolean}
     * @private
     */
    _isRelativeProperty: function( property ) {
        return !/^\d/.test( property ) && property != '';
    },

    /**
     * @returns {*}
     */
    getSource: function() {
        return this.get( 'source' );
    },

    /**
     * @returns {*}
     */
    getSourceProperty: function() {
        return this.get( 'sourceProperty' );
    },

    /**
     *
     * @param element
     * @param property
     */
    bindElement: function( element, property ) {
        var that = this;
        var logger = InfinniUI.global.logger;

        if( this.get( 'element' ) !== null && typeof this.get( 'element' ) !== 'undefined' ) {
            var message = stringUtils.format( 'DataBinding. bindElement: повторная инициализация. {0} заменен на {1}', [ this.get( 'element' ).getName(), element.getName() ] );

            logger.warn( message );
        }

        this.set( 'element', element );
        this.set( 'elementProperty', property );

        element.onPropertyChanged( property, function( context, argument ) {
            that._onElementPropertyChangedHandler( context, argument );
        } );

        if( element.onRemove ) {
            element.onRemove( function( context, args ) {
                var source = that.get( 'source' );
                var bindId = that.get( 'bindId' );
                var propertyName = that.get( 'sourceProperty' );

                if( source && source.offPropertyChanged ) {
                    source.offPropertyChanged( propertyName, bindId );
                }
                that.remove();
            } );
        }

        this._initPropertyOnElement();
    },

    /**
     * @description Делает полную отписку от всех событий
     */
    remove: function() {
        this.off();
        this.clear();
    },

    /**
     *
     * @private
     */
    _initPropertyOnElement: function() {
        var sourceProperty = this.get( 'sourceProperty' );
        var source = this.get( 'source' );
        var value;

        if( this._shouldRefreshElement() && source ) {
            if( typeof source.isDataReady === 'function' && !source.isDataReady() ) {
                if( typeof source.tryInitData === 'function' ) {
                    if( this.getDefaultValue() !== null && typeof this.getDefaultValue() !== 'undefined' ) {
                        this._setValueToElement( this.getDefaultValue(), true );
                    }
                    source.tryInitData();
                }
                return;
            } else {
                value = source.getProperty( sourceProperty );
                this._setValueToElement( value );
            }
        }
    },

    /**
     * @returns {*}
     */
    getElement: function() {
        return this.get( 'element' );
    },

    /**
     * @returns {*}
     */
    getElementProperty: function() {
        return this.get( 'elementProperty' );
    },

    /**
     * @description Обработчик события изменения значения элемента
     * @private
     */
    _onElementPropertyChangedHandler: function( context, argument ) {
        if( this._shouldRefreshSource() ) {
            this._setValueToSource( argument.newValue, context );
        }
    },

    /**
     *
     * @param value
     * @param context
     * @private
     */
    _setValueToSource: function( value, context ) {
        var element = this.get( 'element' );
        var source = this.get( 'source' );
        var sourceProperty = this.get( 'sourceProperty' );
        var converter = this.get( 'converter' );

        if( converter !== null &&
            typeof converter !== 'undefined' &&
            converter.hasOwnProperty( 'toSource' ) //Mozilla's Object.prototype has method "toSource"!!
        ) {
            value = converter.toSource( context, { value: value, binding: this, source: element } );
        }

        source.setProperty( sourceProperty, value );
    },


    /**
     * @description Обработчик события изменения значения источника
     * @private
     */
    _onSourcePropertyChangedHandler: function( context, argument ) {
        if( this._shouldRefreshElement() ) {
            this._setValueToElement( argument.newValue );
        }
    },

    /**
     *
     * @param value
     * @param notConverting
     * @private
     */
    _setValueToElement: function( value, notConverting ) {
        var source = this.get( 'source' );
        var element = this.get( 'element' );
        var elementProperty = this.get( 'elementProperty' );
        var converter = this.get( 'converter' );
        var context = this._getContext();

        if( converter !== null && typeof converter !== 'undefined' &&
            converter.toElement !== null && typeof converter.toElement !== 'undefined' &&
            !notConverting ) {
            value = converter.toElement( context, { value: value, binding: this, source: source } );
        }

        element.setProperty( elementProperty, value );
    },

    /**
     *
     * @returns {*}
     * @private
     */
    _getContext: function() {
        var source = this.getSource();
        var context;

        if( source.getView && source.getView() ) {
            context = source.getView().getContext();
        }

        return context;
    },

    /**
     *
     * @returns {boolean}
     * @private
     */
    _shouldRefreshSource: function() {
        var mode = this.get( 'mode' );
        return mode == InfinniUI.BindingModes.twoWay || mode == InfinniUI.BindingModes.toSource;
    },

    /**
     *
     * @returns {boolean}
     * @private
     */
    _shouldRefreshElement: function() {
        var mode = this.get( 'mode' );
        return mode == InfinniUI.BindingModes.twoWay || mode == InfinniUI.BindingModes.toElement;
    }

} );

InfinniUI.DataBinding = DataBinding;
