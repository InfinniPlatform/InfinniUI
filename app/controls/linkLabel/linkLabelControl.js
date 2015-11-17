var LinkLabelControl = function () {
    _.superClass(LinkLabelControl, this);
};

_.inherit(LinkLabelControl, Control);

_.extend(LinkLabelControl.prototype, {

    createControlModel: function () {
        return new LinkLabelModel();
    },

    createControlView: function (model) {
        return new LinkLabelView({model: model});
    },

    click: function(){
        this.controlView.$el.click();
    }

}, controlValuePropertyMixin);