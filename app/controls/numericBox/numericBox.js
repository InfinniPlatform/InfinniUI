var NumericBoxControl = function () {
    _.superClass(NumericBoxControl, this);
};

_.inherit(NumericBoxControl, Control);

_.extend(NumericBoxControl.prototype, {

    createControlModel: function () {
        return new NumericBoxModel();
    },

    createControlView: function (model) {
        return new NumericBoxView({model: model});
    }
}, controlValuePropertyMixin);