/**
 *
 * @mixin
 */
var editorBaseControlMixin = {

    initialize_editorBaseControl: function() {
    },

    /**
     *
     * @param value
     */
    setValue: function( value ) {
        this.controlModel.set( 'value', value );
    },

    /**
     *
     */
    getValue: function() {
        return this.controlModel.get( 'value' );
    },

    /**
     *
     * @param handler
     */
    onValueChanging: function( handler ) {
        this.controlModel.onValueChanging( handler );
    },

    /**
     *
     * @param handler
     */
    onValueChanged: function( handler ) {
        this.controlModel.onValueChanged( handler );
    },

    /**
     *
     * @returns {*}
     */
    getRawValue: function() {
        return this.controlView.getRawValue();
    }

};

InfinniUI.editorBaseControlMixin = editorBaseControlMixin;
