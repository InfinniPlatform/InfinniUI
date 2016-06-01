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
        var result = value;

        if (typeof value !== 'undefined' && value !== null) {
            var result = +value;
            if (isNaN(result) || !isFinite(result)) {
                result = null;
            }
        }
        return result;
    },

    incValue: function () {
        var delta = this.get('increment');
        this.addToValue(delta);
    },

    decValue: function () {
        var delta = this.get('increment');
        this.addToValue(-delta);
    },

    addToValue: function (delta) {

        var value = this.get('value');
        var startValue = this.get('startValue');
        var minValue = this.get('minValue');
        var maxValue = this.get('maxValue');

        var newValue = _.isNumber(value) ? value : +value;

        if (this.isSetValue(value) && _.isNumber(value)) {
            newValue += delta;
        } else {
            newValue = (_.isNumber(startValue)) ? startValue : 0;
        }

        if (_.isNumber(minValue) && newValue < minValue) {
            newValue = minValue;
        } else if (_.isNumber(maxValue) && newValue > maxValue) {
            newValue = maxValue;
        }

        this.set('value', newValue);
    },

    initialize: function () {
        TextEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    validateValue: function (value, callback) {

        var
            isValid = true,
            min = this.get('minValue'),
            max = this.get('maxValue');

        if (!this.isSetValue(value)) {
            return true;
        }

        if (_.isNumber(min) && _.isNumber(max)) {
            if (value < min || value > max) {
                isValid = false
            }
        } else if (_.isNumber(min) && value < min) {
            isValid = false;
        } else if (_.isNumber(max) && value > max) {
            isValid = false;
        }

        return isValid;
    }


});