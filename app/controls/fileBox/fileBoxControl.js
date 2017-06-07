/**
 *
 * @param parent
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
function FileBoxControl( parent ) {
    _.superClass( FileBoxControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( FileBoxControl, Control );

_.extend( FileBoxControl.prototype, {

    /**
     * @returns {FileBoxModel}
     */
    createControlModel: function() {
        return new FileBoxModel();
    },

    /**
     *
     * @param model
     * @returns {FileBoxView}
     */
    createControlView: function( model ) {
        return new FileBoxView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.FileBoxControl = FileBoxControl;
