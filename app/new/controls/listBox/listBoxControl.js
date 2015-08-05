function ListBoxControl(parent) {
    _.superClass(ListBoxControl, this, parent);
}

_.inherit(ListBoxControl, ListEditorBaseControl);

_.extend(ListBoxControl.prototype, {

    createControlModel: function () {
        return new ListBoxModel();
    },

    createControlView: function (model) {
        return new ListBoxView({model: model});
    }
});

