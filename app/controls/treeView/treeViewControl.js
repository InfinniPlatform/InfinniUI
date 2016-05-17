function TreeViewControl() {
    _.superClass(TreeViewControl, this);
}

_.inherit(TreeViewControl, ListEditorBaseControl);

_.extend(TreeViewControl.prototype, {

    createControlModel: function () {
        return new TreeViewModel();
    },

    createControlView: function (model) {
        return new TreeViewView({model: model});
    }
});

