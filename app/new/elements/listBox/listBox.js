function ListBox(parent) {
    _.superClass(ListBox, this, parent);
}

_.inherit(ListBox, ListEditorBase);

ListBox.prototype.createControl = function () {
    return new ListBoxControl();
};