function CheckBoxBuilder() {
    _.superClass(CheckBoxBuilder, this);
    editorBaseBuilderMixin.call(this);
}

_.inherit(CheckBoxBuilder, ElementBuilder);

_.extend(CheckBoxBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
        editorBaseBuilderMixin.prototype.applyMetadata(this.params);
    }

});