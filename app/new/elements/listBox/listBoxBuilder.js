function ListBoxBuilder() {
    _.superClass(ListBoxBuilder, this);
}

_.inherit(ListBoxBuilder, ListEditorBaseBuilder);

_.extend(ListBoxBuilder.prototype, /** @lends ListBoxBuilder.prototype */{

    createElement: function (params) {
        return new ListBox(params.parent, params.metadata['ViewMode']);
    },

    applyMetadata: function (params) {
        ListEditorBaseBuilder.prototype.applyMetadata.call(this, params);
    }

});