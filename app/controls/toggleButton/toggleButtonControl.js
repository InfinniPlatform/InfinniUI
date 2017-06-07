/**
 * @augments Control
 * @param parent
 * @constructor
 * @mixes editorBaseControlMixin
 */
function ToggleButtonControl( parent ) {
    _.superClass( ToggleButtonControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( ToggleButtonControl, Control );

_.extend( ToggleButtonControl.prototype, {

    /**
     * @returns {ToggleButtonModel}
     */
    createControlModel: function() {
        return new ToggleButtonModel();
    },

    /**
     * @returns {ToggleButtonView}
     * @param model
     */
    createControlView: function( model ) {
        return new ToggleButtonView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.ToggleButtonControl = ToggleButtonControl;
