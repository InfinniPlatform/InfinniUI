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

    createControlModel: function() {
        return new TextBoxModel();
    },

    createControlView: function( model ) {
        return new TextBoxView( { model: model } );
    }
} );

