function ListEditorBase(parent, viewMode) {
    _.superClass(ListEditorBase, this, parent, viewMode);

    this.initialize_editorBase();
}

_.inherit(ListEditorBase, Container);


_.extend(ListEditorBase.prototype, {

    getMultiSelect: function () {
        return this.control.get('multiSelect');
    },

    setMultiSelect: function (value) {
        this.control.set('multiSelect', value);
    },

    getValueSelector: function () {
        return this.control.get('valueSelector');
    },

    setValueSelector: function (value) {
        this.control.set('valueSelector', value);
    },

    getSelectedItem: function () {
        return this.control.get('selectedItem');
    },

    setSelectedItem: function (value) {
        this.control.set('selectedItem', value);
    },

    onSelectedItemChanged: function (handler) {
        //@TODO Вынести createControlEventHandler в базовый элемент?
        this.control.onSelectedItemChanged(this.createControlEventHandler(this, handler));
    },

    getValueComparator: function () {
        return this.control.get('valueComparator');
    }
}, editorBaseMixin);
