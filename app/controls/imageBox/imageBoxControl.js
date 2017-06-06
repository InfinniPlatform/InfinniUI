/**
 *
 * @param parent
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
function ImageBoxControl( parent ) {
    _.superClass( ImageBoxControl, this, parent );
    this.initialize_editorBaseControl();
}

_.inherit( ImageBoxControl, Control );

_.extend( ImageBoxControl.prototype, {

    /**
     * @returns {ImageBoxModel}
     */
    createControlModel: function() {
        return new ImageBoxModel();
    },

    /**
     * @returns {ImageBoxView}
     * @param model
     */
    createControlView: function( model ) {
        return new ImageBoxView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.ImageBoxControl = ImageBoxControl;
