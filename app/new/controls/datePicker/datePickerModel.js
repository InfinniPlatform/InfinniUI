/**
 * @class
 * @augments TextEditorBaseModel
 */
var DatePickerModel = TextEditorBaseModel.extend(/** @lends DatePickerModel.prototype */{
    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            mode: "Date"
        }
    ),

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    validate: function (attributes, options) {
        var
            min = attributes.minValue,
            max = attributes.maxValue;

        //@TODO Check as DateTime
        if (isSet(min) && isSet(max)) {
            if (attributes.value < min || attributes.value > max) {
                return 'Invalid value';
            }
        } else if (isSet(min) && attributes.value < min) {
            return 'Invalid value';
        } else if (isSet(max) && attributes.value > max) {
            return 'invalid value';
        }

        function isSet(value) {
            return value !== null && typeof value !== 'undefined';
        }
    }


});