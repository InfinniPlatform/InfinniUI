/**
 *
 * @mixin
 */
var editorBaseModelMixin = {

    defaults_editorBaseModel: {
        value: null,
        hintText: null,
        errorText: null,
        warningText: null,
        labelFloating: false,
        editMode: false //Текущий редим работы (редактор/отображение)
    },

    /**
     *
     */
    initialize_editorBaseModel: function() {
        this.eventManager = new EventManager();
        this.isInited = true;
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    transformValue: function( value ) {
        return value;
    },

    /**
     *
     * @param value
     * @returns {*}
     * @private
     */
    _applyDefaultValue: function( value ) {
        var defaults = _.result( this, 'defaults' );
        return typeof value === 'undefined' ? defaults[ 'value' ] : value;
    },

    /**
     *
     * @param value
     * @param options
     * @private
     */
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

    /**
     *
     * @param key
     * @param value
     * @param options
     * @returns {*}
     */
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

    /**
     *
     */
    getValue: function() {
        return this.get( 'value' );
    },

    /**
     *
     * @param value
     * @returns {boolean}
     */
    isSetValue: function( value ) {
        return value !== null && typeof value !== 'undefined' && value !== '';
    },

    /**
     *
     * @param handler
     */
    onValueChanging: function( handler ) {
        this.eventManager.on( 'onValueChanging', handler );
    },

    /**
     *
     * @param handler
     */
    onValueChanged: function( handler ) {
        this.on( 'onValueChanged', handler );
    }

};

InfinniUI.editorBaseModelMixin = editorBaseModelMixin;
