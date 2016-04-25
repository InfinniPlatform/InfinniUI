/**
 * @class
 * @augments TextEditorBaseModel
 */
var DateTimePickerModel = TextEditorBaseModel.extend(/** @lends DateTimePickerModel.prototype */{
    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            mode: "Date",
            today: new Date()
        }
    ),

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    validate: function (attributes, options) {
        var
            min = attributes.minValue,
            max = attributes.maxValue;

        return InfinniUI.DateUtils.checkRangeDate(attributes.value, attributes.minValue, attributes.maxValue);
    }


});