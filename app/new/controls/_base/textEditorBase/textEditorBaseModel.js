/**
 * @class
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var TextEditorBaseModel = ControlModel.extend(/** @lends TextEditorBaseModel.prototype */ _.extend({
    defaults: _.defaults({
        labelFloating: false
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
    }
}, editorBaseModelMixin));

