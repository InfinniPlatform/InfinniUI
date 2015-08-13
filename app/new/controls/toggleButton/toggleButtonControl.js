function ToggleButtonControl(parent) {
    _.superClass(ToggleButtonControl, this, parent);
    editorBaseControlMixin.call(this);
}

_.inherit(ToggleButtonControl, Control);

_.extend(ToggleButtonControl.prototype, {

    createControlModel: function () {
        return new ToggleButtonModel();
    },

    createControlView: function (model) {
        return new ToggleButtonView({model: model});
    }
});

