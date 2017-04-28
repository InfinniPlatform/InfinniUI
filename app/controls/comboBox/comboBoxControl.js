/**
 *
 * @param viewMode
 * @constructor
 */
function ComboBoxControl( viewMode ) {
    _.superClass( ListBoxControl, this, viewMode );
}

_.inherit( ComboBoxControl, ListEditorBaseControl );

_.extend( ComboBoxControl.prototype, {

    /**
     *
     * @returns {ComboBoxModel}
     */
    createControlModel: function() {
        return new ComboBoxModel();
    },

    /**
     *
     * @param model
     * @returns {ComboBoxView}
     */
    createControlView: function( model ) {
        return new ComboBoxView( { model: model } );
    },

    /**
     *
     * @param message
     */
    setNoItemsMessage: function( message ) {
        this.controlModel.setNoItemsMessage( message );
    }

} );

InfinniUI.ComboBoxControl = ComboBoxControl;
