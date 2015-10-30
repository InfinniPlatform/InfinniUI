var ComboBoxModel = ListEditorBaseModel.extend({
    initialize: function () {
        ListEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    toggleItem: function (item) {
        var value = this.valueByItem(item);
        this.toggleValue(value);
    }
});