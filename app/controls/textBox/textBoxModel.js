/**
 * @class
 * @augments TextEditorBaseModel
 */
var TextBoxModel = TextEditorBaseModel.extend(/** @lends TextBoxModel.prototype */{
    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            multiline: false,
            type: 'text'
        }
    ),

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    }

});