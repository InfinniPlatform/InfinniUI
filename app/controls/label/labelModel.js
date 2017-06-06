/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var LabelModel = ControlModel.extend( _.extend( {

    defaults: _.defaults( {
        horizontalTextAlignment: 'Left',
        textWrapping: true,
        textTrimming: true,
        escapeHtml: true,
        focusable: false
    }, ControlModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();
    }

}, editorBaseModelMixin ) );

InfinniUI.LabelModel = LabelModel;
