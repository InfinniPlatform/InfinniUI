/**
 *
 * @mixin editorBaseMixin
 */
var editorBaseMixin = {

    /**
     *
     */
    initialize_editorBase: function() {
    },

    /**
     * @returns {*}
     */
    getValue: function() {
        return this.control.getValue();
    },

    /**
     *
     * @param value
     */
    setValue: function( value ) {
        this.control.setValue( value );
    },

    /**
     * @returns {*}
     */
    getLabelFloating: function() {
        return this.control.get( 'labelFloating' );
    },

    /**
     *
     * @param value
     */
    setLabelFloating: function( value ) {
        this.control.set( 'labelFloating', value );
    },

    /**
     * @returns {*}
     */
    getHintText: function() {
        return this.control.get( 'hintText' );
    },

    /**
     *
     * @param value
     */
    setHintText: function( value ) {
        this.control.set( 'hintText', value );
    },

    /**
     * @returns {*}
     */
    getErrorText: function() {
        return this.control.get( 'errorText' );
    },

    /**
     *
     * @param value
     */
    setErrorText: function( value ) {
        this.control.set( 'errorText', value );
    },

    /**
     * @returns {*}
     */
    getWarningText: function() {
        return this.control.get( 'warningText' );
    },

    /**
     *
     * @param value
     */
    setWarningText: function( value ) {
        this.control.set( 'warningText', value );
    },

    convertValue: function( value ) {
        return value;
    },

    /**
     *
     * @param handler
     */
    onValueChanging: function( handler ) {
        this.control.onValueChanging(
            this.createControlEventHandler( this, handler, { property: 'value' } )
        );
    },

    /**
     *
     * @param handler
     */
    onValueChanged: function( handler ) {
        this.control.onValueChanged(
            this.createControlEventHandler( this, handler, { property: 'value' } )
        );
    }

};

InfinniUI.editorBaseMixin = editorBaseMixin;
