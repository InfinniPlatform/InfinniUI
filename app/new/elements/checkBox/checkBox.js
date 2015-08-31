function CheckBox(parent) {
    _.superClass(CheckBox, this, parent);

    editorBaseMixin.call(this);
}

_.inherit(CheckBox, Element);

CheckBox.prototype.createControl = function () {
    return new CheckBoxControl();
};