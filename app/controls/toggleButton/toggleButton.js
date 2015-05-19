var ToggleButtonControl = function () {
    _.superClass(ToggleButtonControl, this);
};

_.inherit(ToggleButtonControl, Control);

_.extend(ToggleButtonControl.prototype, {
    createControlModel: function () {
        return new ToggleButtonModel();
    },

    createControlView: function (model) {
        return new ToggleButtonView({model: model});
    },

    onValueChanged: function (handler) {
        this.controlModel.on('change:value', handler);
    }
});