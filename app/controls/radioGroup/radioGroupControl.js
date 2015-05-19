var RadioGroupControl = function () {
    _.superClass(RadioGroupControl, this);
};

_.inherit(RadioGroupControl, Control);

_.extend(RadioGroupControl.prototype, {

    createControlModel: function () {
        return new RadioGroupModel();
    },

    createControlView: function (model) {
        return new RadioGroupView({model: model});
    }

}, controlValuePropertyMixin);