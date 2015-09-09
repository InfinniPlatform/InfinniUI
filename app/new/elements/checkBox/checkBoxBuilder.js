function CheckBoxBuilder() {
    _.superClass(CheckBoxBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(CheckBoxBuilder, ElementBuilder);

_.extend(CheckBoxBuilder.prototype, {

    createElement: function (params) {
        return new CheckBox(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
        this.applyMetadata_editorBaseBuilder(params);
    }

}, editorBaseBuilderMixin);