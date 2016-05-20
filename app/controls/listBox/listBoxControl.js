function ListBoxControl(viewMode) {
    _.superClass(ListBoxControl, this, viewMode);
}

_.inherit(ListBoxControl, ListEditorBaseControl);

_.extend(ListBoxControl.prototype, {

    createControlModel: function () {
        return new ListBoxModel();
    },

    createControlView: function (model, viewMode) {
        if(!viewMode || ! viewMode in window.InfinniUI.Listbox){
            viewMode = 'common';
        }

        var ViewClass = window.InfinniUI.Listbox.viewModes[viewMode];

        return new ViewClass({model: model});
    }
});

