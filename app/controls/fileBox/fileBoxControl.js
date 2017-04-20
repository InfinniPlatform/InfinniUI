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

    createControlModel: function() {
        return new FileBoxModel();
    },

    createControlView: function( model ) {
        return new FileBoxView( { model: model } );
    }

}, editorBaseControlMixin );

