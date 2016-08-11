function LinkBuilder() {
    _.superClass(LinkBuilder, this);
}

_.inherit(LinkBuilder, ButtonBuilder);

_.extend(LinkBuilder.prototype, {

    createElement: function (params) {
        return new Link(params.parent);
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
