/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBaseControl
 */
function TextBoxControl( parent ) {
    _.superClass( TextBoxControl, this, parent );
}

_.inherit( TextBoxControl, TextEditorBaseControl );

_.extend( TextBoxControl.prototype, {

    /**
     * @returns {TextBoxModel}
     */
    createControlModel: function() {
        return new TextBoxModel();
    },

    /**
     * @returns {TextBoxView}
     * @param model
     */
    createControlView: function( model ) {
        return new TextBoxView( { model: model } );
    }

} );

InfinniUI.TextBoxControl = TextBoxControl;
