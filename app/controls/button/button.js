var ButtonControl = function(){
    _.superClass(ButtonControl, this);
};

_.inherit(ButtonControl, Control);

_.extend(ButtonControl.prototype, {

    createControlModel: function () {
        return new ButtonModel();
    },

    createControlView: function (model) {
        return new ButtonView({model: model});
    },

    onEnabledChange: function (handler) {
        this.controlModel.on('change:enabled', handler);
    },

    click: function(){
        this.controlView.$el.click();
    }
});