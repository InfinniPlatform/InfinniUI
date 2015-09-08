/**
 * @class
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var TextEditorBaseModel = ControlModel.extend(/** @lends TextEditorBaseModel.prototype */{
    defaults: _.extend(
        {},
        ControlModel.prototype.defaults,
        {
            labelFloating: false
        }
    ),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        editorBaseModelMixin.call(this);
    }
});

