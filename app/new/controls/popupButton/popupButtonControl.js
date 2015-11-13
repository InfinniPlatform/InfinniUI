function PopupButtonControl(parent) {
    _.superClass(PopupButtonControl, this, parent);
}

_.inherit(PopupButtonControl, ContainerControl);

_.extend(PopupButtonControl.prototype, /** @lends PopupButtonControl.prototype */ {

    createControlModel: function () {
        return new PopupButtonModel();
    },

    createControlView: function (model) {
        return new PopupButtonView({model: model});
    }

}, buttonControlMixin);

