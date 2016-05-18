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

    getDisabledItemCondition: function () {
        return this.control.get('disabledItemCondition');
    },

    setDisabledItemCondition: function (value) {
        this.control.set('disabledItemCondition', value);
    },

    setValueItem: function(item){
        var result;
        var isMultiSelect = this.getMultiSelect();
        var valueSelector = this.getValueSelector();

        if(isMultiSelect){
            result = [];

            for(var i = 0, ii = item.length; i < ii; i++){
                result[i] = valueSelector(null, {value: item[i]});
            }

        }else{
            result = valueSelector(null, {value: item});
        }

        this.setValue(result);
    },

    getSelectedItem: function () {
        return this.control.get('selectedItem');
    },

    setSelectedItem: function (value) {
        this.control.set('selectedItem', value);
    },

    onSelectedItemChanged: function (handler) {
        this.control.onSelectedItemChanged(this.createControlEventHandler(this, handler));
    }

    // UNUSED ?
    //getValueComparator: function () {
    //    return this.control.get('valueComparator');
    //}

}, editorBaseMixin);
