/**
 *
 * @param parent
 * @constructor
 * @augments TextBoxControl
 */
function ButtonEditControl( parent ) {
    _.superClass( ButtonEditControl, this, parent );
}

_.inherit( ButtonEditControl, TextBoxControl );

_.extend( ButtonEditControl.prototype, {

    /**
     *
     * @returns {ButtonEditModel}
     */
    createControlModel: function() {
        return new ButtonEditModel();
    },

    /**
     *
     * @param model
     * @returns {ButtonEditView}
     */
    createControlView: function( model ) {
        return new ButtonEditView( { model: model } );
    },

    /**
     *
     * @param handler
     */
    onButtonClick: function( handler ) {
        this.controlView.on( 'buttonClick', handler );
    }

} );

InfinniUI.ButtonEditControl = ButtonEditControl;
