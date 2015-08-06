function CheckBoxBuilder() {
    _.superClass(CheckBoxBuilder, this);
    editorBaseBuilderMixin.call(this);
}

_.inherit(CheckBoxBuilder, ElementBuilder);

_.extend(CheckBoxBuilder.prototype, {

    createElement: function (params) {
        return new CheckBox(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
        editorBaseBuilderMixin.applyMetadata.call(this, params);
    }

});