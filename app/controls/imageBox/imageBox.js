var ImageBoxControl = function () {
    _.superClass(ImageBoxControl, this);
};

_.inherit(ImageBoxControl, Control);

_.extend(ImageBoxControl.prototype, {
    createControlModel: function () {
        return new ImageBoxModel();
    },

    createControlView: function (model) {
        return new ImageBoxView({model: model});
    },

    onValueChanged: function(handler){
        this.controlModel.on('change:value', handler);
    }
});
