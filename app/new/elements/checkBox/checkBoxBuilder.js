function CheckBoxBuilder() {
    _.superClass(CheckBoxBuilder, this);
}

_.inherit(CheckBoxBuilder, ListBoxBuilder);

_.extend(CheckBoxBuilder.prototype, {

    createElement: function (params) {
        var viewMode = params.metadata['ViewMode'] || 'checking';
        return new ListBox(params.parent, viewMode);
    },

    applyMetadata: function (params) {
        var element = params.element;
        ListBoxBuilder.prototype.applyMetadata.call(this, params);

        element.setMultiSelect(true);
    }

});