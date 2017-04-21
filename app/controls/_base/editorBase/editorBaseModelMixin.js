var editorBaseModelMixin = {

    defaults_editorBaseModel: {
        value: null,
        hintText: null,
        errorText: null,
        warningText: null,
        labelFloating: false
    },

    initialize_editorBaseModel: function() {
        this.eventManager = new EventManager();
        this.isInited = true;
    },

    transformValue: function( value ) {
        return value;
    },

    _applyDefaultValue: function( value ) {
        var defaults = _.result( this, 'defaults' );
        return typeof value === 'undefined' ? defaults[ 'value' ] : value;
    },

    _setValue: function( value, options ) {
        value = this.transformValue( value );
        value = this._applyDefaultValue( value );

        var oldValue = this.get( 'value' );
        var message = {
            oldValue: oldValue,
            newValue: value
        };

        if( value === oldValue ) {
            return;
        }

        if( this.isInited ) {
            if( this.eventManager.trigger( 'onValueChanging', message ) ) {
                ContainerModel.prototype.set.call( this, 'value', value, options || {} );
                this.trigger( 'onValueChanged', message );
            }
        } else {
            ContainerModel.prototype.set.call( this, 'value', value, options || {} );
        }
    },

    set: function( key, value, options ) {
        var attributes;
        if( key === null || typeof key === 'undefined' ) {
            return this;
        }

        if( typeof key === 'object' ) {
            attributes = key;
            options = value;
        } else {
            ( attributes = {} )[ key ] = value;
        }

        options = options || {};

        if( 'value' in attributes ) {
            this._setValue( attributes.value, options );
            delete attributes.value;
        }

        var hasAttributes = false;

        for( var i in attributes ) {
            hasAttributes = true;
            break;
        }

        if( hasAttributes ) {
            return ContainerModel.prototype.set.call( this, attributes, options );
        }

        return false;
    },

    getValue: function() {
        return this.get( 'value' );
    },

    isSetValue: function( value ) {
        return value !== null && typeof value !== 'undefined' && value !== '';
    },

    onValueChanging: function( handler ) {
        this.eventManager.on( 'onValueChanging', handler );
    },

    onValueChanged: function( handler ) {
        this.on( 'onValueChanged', handler );
    }

};
