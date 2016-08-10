function LinkElementBuilder() {
    _.superClass(LinkElementBuilder, this);
}

_.inherit(LinkElementBuilder, ButtonBuilder);

_.extend(LinkElementBuilder.prototype, {

    createElement: function (params) {
        return new LinkElement(params.parent);
    },

    applyMetadata: function (params) {
        ButtonBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata,
            element = params.element;

        if( metadata.Href ) {
            element.setHref(metadata.Href);
        }

        if( metadata.Target ) {
            element.setTarget(metadata.Target);
        }
    }

});
