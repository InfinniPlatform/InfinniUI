/**
 * @constructor
 */
function CheckBox(parentView) {
    _.superClass(CheckBox, this, parentView);
}

_.inherit(CheckBox, Element);

_.extend(CheckBox.prototype, {

    createControl: function () {
        return new CheckBoxControl();
    }

},
    valuePropertyMixin,
    elementHorizontalTextAlignmentMixin,
    elementForegroundMixin,
    elementTextStyleMixin
);