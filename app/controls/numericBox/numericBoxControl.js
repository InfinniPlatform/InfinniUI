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

    /**
     * @returns {NumericBoxModel}
     */
    createControlModel: function() {
        return new NumericBoxModel();
    },

    /**
     * @returns {NumericBoxView}
     * @param model
     */
    createControlView: function( model ) {
        return new NumericBoxView( { model: model } );
    }

} );

InfinniUI.NumericBoxControl = NumericBoxControl;
