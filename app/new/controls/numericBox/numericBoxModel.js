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

    transformValue: function (value) {
        if (typeof value !== 'undefined' && value !== null) {
            var value = +value;
            if (isNaN(value) || !isFinite(value)) {
                value = null;
            }
        }
        return value;
    },

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    //validate: function (attributes, options) {
    //    var
    //        min = attributes.minValue,
    //        max = attributes.maxValue;
    //
    //    if (isSet(min) && isSet(max)) {
    //        if (attributes.value < min || attributes.value > max) {
    //            return 'Invalid value';
    //        }
    //    } else if (isSet(min) && attributes.value < min) {
    //            return 'Invalid value';
    //    } else if (isSet(max) && attributes.value > max) {
    //        return 'invalid value';
    //    }
    //
    //    function isSet(value) {
    //        return value !== null && typeof value !== 'undefined';
    //    }
    //},

    validateValue: function (value, callback) {

        var
            isValid = true,
            min = this.get('minValue'),
            max = this.get('maxValue');

        if (isSet(min) && isSet(max)) {
            if (value < min || value > max) {
                isValid = false
            }
        } else if (isSet(min) && value < min) {
            isValid = false;
        } else if (isSet(max) && value > max) {
            isValid = false;
        }

        return isValid;

        function isSet(value) {
            return value !== null && typeof value !== 'undefined' && value !== '';
        }

    }


});