/**
 *
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

    createControlModel: function() {
        return new FrameModel();
    },

    createControlView: function( model ) {
        return new FrameView( { model: model } );
    }

}, editorBaseControlMixin );

InfinniUI.FrameControl = FrameControl;
