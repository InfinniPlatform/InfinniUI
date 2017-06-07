/**
 * @constructor
 * @augments Control
 * @mixes editorBaseControlMixin
 */
var FrameControl = function() {
    _.superClass( FrameControl, this );
    this.initialize_editorBaseControl();
};

_.inherit( FrameControl, Control );

_.extend( FrameControl.prototype, {

    /**
     * @returns {FrameModel}
     */
    createControlModel: function() {
        return new FrameModel();
    },

    /**
     * @returns {FrameView}
     * @param model
     */
    createControlView: function( model ) {
        return new FrameView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.FrameControl = FrameControl;
