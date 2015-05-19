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
    },

    setReadOnly: function (readonly) {
        return this.control.set('readOnly', readonly);
    },

    getReadOnly: function () {
        return this.control.get('readOnly');
    }

}, valuePropertyMixin, horizontalTextAlignmentPropertyMixin);