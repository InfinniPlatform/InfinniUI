/**
 *
 * @param parent
 * @constructor
 * @augment Element
 */
function ToggleButton(parent) {
    _.superClass(ToggleButton, this, parent);
    this.initialize_editorBase();
}

window.InfinniUI.ToggleButton = ToggleButton;

_.inherit(ToggleButton, Element);


_.extend(ToggleButton.prototype, {

    createControl: function (parent) {
        return new ToggleButtonControl(parent);
    },

    getTextOn: function () {
        return this.control.get('textOn');
    },

    setTextOn: function (value) {
        return this.control.set('textOn', value ? value : '');
    },

    getTextOff: function () {
        return this.control.get('textOff');
    },

    setTextOff: function (value) {
        return this.control.set('textOff', value ? value : '');
    }
}, editorBaseMixin);
