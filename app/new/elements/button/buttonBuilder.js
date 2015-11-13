function ButtonBuilder() {
    _.superClass(ButtonBuilder, this);
}

_.inherit(ButtonBuilder, ElementBuilder);

_.extend(ButtonBuilder.prototype, {

    createElement: function (params) {
        var viewMode = params.metadata['ViewMode'];
        return new Button(params.parent, viewMode);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.applyButtonMetadata(params);
    }

}, buttonBuilderMixin);



