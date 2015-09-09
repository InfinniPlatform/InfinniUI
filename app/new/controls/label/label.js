var LabelControl = function () {
    _.superClass(LabelControl, this);
    this.initialize_editorBaseControl();
};

_.inherit(LabelControl, Control);

_.extend(LabelControl.prototype, {

    createControlModel: function () {
        return new LabelModel();
    },

    createControlView: function (model) {
        return new LabelView({model: model});
    }

}, editorBaseControlMixin);