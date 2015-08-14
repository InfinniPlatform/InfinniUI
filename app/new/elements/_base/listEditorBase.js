function ListEditorBase(parent) {
    _.superClass(ListEditorBase, this, parent);

    editorBaseMixin.call(this);
}

_.inherit(ListEditorBase, Container);

ListEditorBase.prototype.getMultiSelect = function () {
    return this.control.get('multiSelect');
};

ListEditorBase.prototype.setMultiSelect = function (value) {
    this.control.set('multiSelect', value);
};

ListEditorBase.prototype.getValueSelector = function () {
    return this.control.get('valueSelector');
};

ListEditorBase.prototype.setValueSelector = function (value) {
    this.control.set('valueSelector', value);
};

ListEditorBase.prototype.getGroupValueSelector = function () {
    return this.control.get('groupValueSelector');
};

ListEditorBase.prototype.setGroupValueSelector = function (value) {
    this.control.set('groupValueSelector', value);
};

ListEditorBase.prototype.getGroupItemTemplate = function () {
    return this.control.get('groupItemTemplate');
};

ListEditorBase.prototype.setGroupItemTemplate = function (value) {
    this.control.set('groupItemTemplate', value);
};

ListEditorBase.prototype.getGroupItemComparator = function () {
    return this.control.get('groupItemComparator');
};

ListEditorBase.prototype.setGroupItemComparator = function (value) {
    this.control.set('groupItemComparator', value);
};

ListEditorBase.prototype.getSelectedItem = function () {
    return this.control.get('selectedItem');
};

ListEditorBase.prototype.setSelectedItem = function (value) {
    this.control.set('selectedItem', value);
};

ListEditorBase.prototype.onSelectedItemChanged = function (handler) {
    //@TODO Вынести createControlEventHandler в базовый элемент?
    this.control.onSelectedItemChanged(this.createControlEventHandler(handler));
};

ListEditorBase.prototype.setValueComparator = function (comparator) {
    this.control.set('valueComparator', comparator);
};

ListEditorBase.prototype.getValueComparator = function () {
    return this.control.get('valueComparator');
};
