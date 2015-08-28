var ListBoxControl = function () {
    _.superClass(ListBoxControl, this);
};

_.inherit(ListBoxControl, Control);

_.extend(ListBoxControl.prototype, {

    createControlModel: function () {
        return new ListBoxModel();
    },

    createControlView: function (model) {
        return new ListBoxView({model: model});
    }

}, controlValuePropertyMixin);