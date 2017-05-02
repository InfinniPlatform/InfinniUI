/**
 *
 * @param parent
 * @constructor
 * @augments TextEditorBaseControl
 */
function NumericBoxControl( parent ) {
    _.superClass( NumericBoxControl, this, parent );
}

_.inherit( NumericBoxControl, TextEditorBaseControl );

_.extend( NumericBoxControl.prototype, {

    createControlModel: function() {
        return new NumericBoxModel();
    },

    createControlView: function( model ) {
        return new NumericBoxView( { model: model } );
    }

} );

InfinniUI.NumericBoxControl = NumericBoxControl;
