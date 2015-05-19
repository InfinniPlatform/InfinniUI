var ToolBarSeparatorControl = function () {
    _.superClass(ToolBarSeparatorControl, this);
};

_.inherit(ToolBarSeparatorControl, Control);

_.extend(ToolBarSeparatorControl.prototype, {

    createControlModel: function () {
        return new ToolBarSeparatorModel();
    },

    createControlView: function (model) {
        return new ToolBarSeparatorView({model: model});
    }

});