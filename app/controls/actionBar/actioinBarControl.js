var ActionBarControl = function () {
    _.superClass(ActionBarControl, this);
};

_.inherit(ActionBarControl, Control);

_.extend(ActionBarControl.prototype, {
    createControlModel: function () {
        return new ActionBarModel();
    },

    createControlView: function (model) {
        return new ActionBarView({model: model});
    }
});
