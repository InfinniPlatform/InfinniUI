function ListBoxBuilder() {
    _.superClass(ListBoxBuilder, this);
}

_.inherit(ListBoxBuilder, ListEditorBaseBuilder);

_.extend(ListBoxBuilder.prototype, /** @lends ListBoxBuilder.prototype */{

    getItemTemplateBuilder: function () {
        if (!this.itemTemplateBuilder) {
            this.itemTemplateBuilder = new ListBoxItemTemplate();
        }
        return this.itemTemplateBuilder;
    },

    getGroupItemTemplateBuilder: function () {
        if (!this.groupItemTemplateBuilder) {
            this.groupItemTemplateBuilder = new ListBoxGroupItemTemplate();
        }
        return this.groupItemTemplateBuilder;
    },

    createElement: function (params) {
        return new ListBox(params.parent);
    },

    applyMetadata: function (params) {
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);
    }

});