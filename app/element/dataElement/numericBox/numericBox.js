function NumericBox(parentView) {
    _.superClass(NumericBox, this, parentView);
}

_.inherit(NumericBox, Element);

_.extend(NumericBox.prototype, {

    createControl: function () {
        return new NumericBoxControl();
    },

    setMinValue: function (minValue) {
        if(this.isNumeric(minValue)) {
            return this.control.set('minValue', minValue);
        }
    },

    getMinValue: function () {
        return this.control.get('minValue');
    },

    setMaxValue: function (maxValue) {
        if(this.isNumeric(maxValue)) {
            return this.control.set('maxValue', maxValue);
        }
    },

    getMaxValue: function () {
        return this.control.get('maxValue');
    },

    setIncrement: function (increment) {
        if(this.isNumeric(increment)) {
            return this.control.set('increment', increment);
        }
    },

    getIncrement: function () {
        return this.control.get('increment');
    },

    isNumeric: function( obj ) {
        return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
    }
},
    valuePropertyMixin,
    formatPropertyMixin,
    elementHorizontalTextAlignmentMixin,
    editMaskPropertyMixin,
    baseTextElementMixin,
    elementBackgroundMixin,
    elementForegroundMixin,
    elementTextStyleMixin,
    elementHintTextMixin,
    elementErrorTextMixin,
    elementLabelTextMixin
);
