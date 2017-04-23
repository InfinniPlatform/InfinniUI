function ComboBoxControl( viewMode ) {
    _.superClass( ListBoxControl, this, viewMode );
}

_.inherit( ComboBoxControl, ListEditorBaseControl );

_.extend( ComboBoxControl.prototype, {

    createControlModel: function() {
        return new ComboBoxModel();
    },

    createControlView: function( model ) {
        return new ComboBoxView( { model: model } );
    },

    setNoItemsMessage: function( message ) {
        this.controlModel.setNoItemsMessage( message );
    }

} );

InfinniUI.ComboBoxControl = ComboBoxControl;
