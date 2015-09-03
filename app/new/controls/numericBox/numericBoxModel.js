/**
 * @class
 * @augments TextEditorBaseModel
 */
var NumericBoxModel = TextEditorBaseModel.extend(/** @lends TextBoxModel.prototype */{
    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            increment: 1
        }
    ),

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    }

});