/**
 * @class
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var TextEditorBaseModel = ControlModel.extend( {

    defaults: _.defaults( {
        labelText: null,
        labelTextTitle: null,
        displayFormat: null,
        editMask: null
    }, editorBaseModelMixin.defaults_editorBaseModel, ControlModel.prototype.defaults ),

    /**
     *
     */
    initialize: function() {
        ControlModel.prototype.initialize.apply( this, arguments );
        this.initialize_editorBaseModel();
    }
} );

_.extend( TextEditorBaseModel.prototype, editorBaseModelMixin );

InfinniUI.TextEditorBaseControl = TextEditorBaseControl;

