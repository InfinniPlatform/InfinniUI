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

    createControlModel: function() {
        return new ButtonEditModel();
    },

    createControlView: function( model ) {
        return new ButtonEditView( { model: model } );
    },

    onButtonClick: function( handler ) {
        this.controlView.on( 'buttonClick', handler );
    }

} );

InfinniUI.ButtonEditControl = ButtonEditControl;

