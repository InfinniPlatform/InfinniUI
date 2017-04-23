var editorBaseControlMixin = {

    initialize_editorBaseControl: function() {
    },

    setValue: function( value ) {
        this.controlModel.set( 'value', value );
    },

    getValue: function() {
        return this.controlModel.get( 'value' );
    },

    onValueChanging: function( handler ) {
        this.controlModel.onValueChanging( handler );
    },

    onValueChanged: function( handler ) {
        this.controlModel.onValueChanged( handler );
    }

};

InfinniUI.Mixins.editorBaseControlMixin = editorBaseControlMixin;
