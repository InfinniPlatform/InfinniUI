function ToggleButton(parentView) {
    _.superClass(ToggleButton, this, parentView);
}

_.inherit(ToggleButton, Element);

_.extend(ToggleButton.prototype, {

    createControl: function () {
        return new ToggleButtonControl();
    },

    setTextOn: function (textOn) {
        return this.control.set('textOn', textOn);
    },

    setTextOff: function (textOff) {
        return this.control.set('textOff', textOff);
    }
},
    valuePropertyMixin
);
