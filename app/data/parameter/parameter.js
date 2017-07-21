/**
 * @constructor
 * @arguments Backbone.Model
 */
var Parameter = Backbone.Model.extend( {

    defaults: {
        name: null,
        view: null,
        value: undefined
    },

    initialize: function() {
    },

    /**
     *
     * @param property
     * @param handler
     */
    onPropertyChanged: function( property, handler ) {
        if( typeof property === 'function' ) {
            handler = property;
            this.on( 'onPropertyChanged', handler );
        } else {
            this.on( 'onPropertyChanged:' + property, handler );
        }

    },

    /**
     *
     * @returns {*}
     */
    getName: function() {
        return this.get( 'name' );
    },

    /**
     *
     * @param newName
     */
    setName: function( newName ) {
        this.set( 'name', newName );
        this.name = newName;
    },

    /**
     * @returns {*}
     */
    getView: function() {
        return this.get( 'view' );
    },

    /**
     *
     * @returns {*}
     */
    getValue: function() {
        return this.getProperty( '' );
    },

    /**
     *
     * @param value
     */
    setValue: function( value ) {
        this.setProperty( '', value );
    },

    /**
     *
     * @param property
     * @returns {*}
     */
    getProperty: function( property ) {
        var value = this.get( 'value' );

        if( property === '' ) {
            return value;
        } else {
            return this._nullToUndefined( InfinniUI.ObjectUtils.getPropertyValue( value, property ) );
        }
    },

    /**
     *
     * @param property
     * @param value
     */
    setProperty: function( property, value ) {
        var fullParameterValue = this.getValue();
        var oldValue = this.getProperty( property );

        if( value == oldValue ) {
            return;
        }

        if( property === '' ) {
            this.set( 'value', value );

        } else {
            InfinniUI.ObjectUtils.setPropertyValue( fullParameterValue, property, value );
        }

        this._notifyAboutPropertyChanged( property, value, oldValue );
    },

    /**
     *
     * @param property
     * @param newValue
     * @param oldValue
     * @private
     */
    _notifyAboutPropertyChanged: function( property, newValue, oldValue ) {
        var context = this._getContext();
        var argument = {};

        argument.property = property;
        argument.newValue = newValue;
        argument.oldValue = oldValue;

        this.trigger( 'onPropertyChanged', context, argument );
        this.trigger( 'onPropertyChanged:' + property, context, argument );
    },

    /**
     *
     * @returns {*}
     * @private
     */
    _getContext: function() {
        var view = this.getView();

        if( view ) {
            return view.getContext();
        } else {
            return undefined;
        }
    },

    /**
     *
     * @param val
     * @returns {*}
     * @private
     */
    _nullToUndefined: function( val ) {
        if( val === null ) {
            return undefined;
        } else {
            return val;
        }
    },

    /**
     *
     * @param element
     * @param handler
     * @param additionParams
     * @returns {Function}
     */
    createControlEventHandler: function( element, handler, additionParams ) {
        var context;
        var parentView = element.getView();
        additionParams = additionParams || {};

        if( parentView ) {
            context = parentView.context;
        }

        return function( message ) {
            message = message || {};
            _.extend(
                message,
                additionParams
            );
            message.source = element;

            return handler.call( undefined, context, message );
        };
    },

    /**
     *
     * @param handler
     * @returns {*|CollectionEventManager|{name}}
     */
    onRemove: function( handler ) {
        return this.on( messageTypes.onRemove.name, this.createControlEventHandler( this, handler ) );
    },

    /**
     *
     */
    remove: function() {
        this.off();
        this.clear();
    }

} );

InfinniUI.Parameter = Parameter;
