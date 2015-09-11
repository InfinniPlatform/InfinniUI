/**
 * @class
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var TextEditorBaseModel = ControlModel.extend(/** @lends TextEditorBaseModel.prototype */ {
    defaults: _.defaults({
            labelFloating: false
        },
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }
});

_.extend(TextEditorBaseModel.prototype, editorBaseModelMixin);

