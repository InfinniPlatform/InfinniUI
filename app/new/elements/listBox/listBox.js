function ListBox(parent, viewMode) {
    _.superClass(ListBox, this, parent, viewMode);
}

_.inherit(ListBox, ListEditorBase);

ListBox.prototype.createControl = function (viewMode) {
    return new ListBoxControl(viewMode);
};