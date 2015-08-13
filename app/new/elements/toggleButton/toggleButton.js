/**
 *
 * @param parent
 * @constructor
 * @augment Element
 */
function ToggleButton(parent) {
    _.superClass(ToggleButton, this, parent);
    editorBaseMixin.call(this);
}

_.inherit(ToggleButton, Element);

ToggleButton.prototype.createControl = function () {
    return new ToggleButtonControl();
};

ToggleButton.prototype.getTextOn = function () {
    return this.control.get('textOn');
};

ToggleButton.prototype.setTextOn = function (value) {
    return this.control.set('textOn', value ? value : '');
};

ToggleButton.prototype.getTextOff = function () {
    return this.control.get('textOff');
};

ToggleButton.prototype.setTextOff = function (value) {
    return this.control.set('textOff', value ? value : '');
};