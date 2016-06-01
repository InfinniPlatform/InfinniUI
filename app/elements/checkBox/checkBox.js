/**
 *
 * @param parent
 * @constructor
 * @augment Element
 */
function CheckBox(parent) {
    _.superClass(CheckBox, this, parent);
    this.initialize_editorBase();
}

_.inherit(CheckBox, Element);


_.extend(CheckBox.prototype, {

    createControl: function (parent) {
        return new CheckBoxControl(parent);
    }

}, editorBaseMixin);