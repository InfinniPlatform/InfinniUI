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

    onPropertyChanged: function( property, handler ) {
        if( typeof property == 'function' ) {
            handler = property;
            this.on( 'onPropertyChanged', handler );
        } else {
            this.on( 'onPropertyChanged:' + property, handler );
        }

    },

    getName: function() {
        return this.get( 'name' );
    },

    setName: function( newName ) {
        this.set( 'name', newName );
        this.name = newName;
    },

    getView: function() {
        return this.get( 'view' );
    },

    getValue: function() {
        return this.getProperty( '' );
    },

    setValue: function( value ) {
        this.setProperty( '', value );
    },

    getProperty: function( property ) {
        var value = this.get( 'value' );

        if( property == '' ) {
            return value;
        } else {
            return this._nullToUndefined( InfinniUI.ObjectUtils.getPropertyValue( value, property ) );
        }
    },

    setProperty: function( property, value ) {
        var fullParameterValue = this.getValue(),
            oldValue = this.getProperty( property );

        if( value == oldValue ) {
            return;
        }

        if( property == '' ) {
            this.set( 'value', value );

        } else {
            InfinniUI.ObjectUtils.setPropertyValue( fullParameterValue, property, value );
        }

        this._notifyAboutPropertyChanged( property, value, oldValue );
    },

    _notifyAboutPropertyChanged: function( property, newValue, oldValue ) {
        var context = this._getContext();
        var argument = {};

        argument.property = property;
        argument.newValue = newValue;
        argument.oldValue = oldValue;

        this.trigger( 'onPropertyChanged', context, argument );
        this.trigger( 'onPropertyChanged:' + property, context, argument );
    },

    _getContext: function() {
        var view = this.getView();
        if( view ) {
            return view.getContext();
        } else {
            return undefined;
        }
    },

    _nullToUndefined: function( val ) {
        if( val === null ) {
            return undefined;
        } else {
            return val;
        }
    }
} );

window.InfinniUI.Parameter = Parameter;
