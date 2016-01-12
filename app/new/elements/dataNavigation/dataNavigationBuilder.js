function DataNavigationBuilder () {
    _.superClass(DataNavigationBuilder, this);
}

_.inherit(DataNavigationBuilder, ElementBuilder);

_.extend(DataNavigationBuilder.prototype, {

    createElement: function (params) {
        return new DataNavigation(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element;
        var metadata = params.metadata;

        if (Array.isArray(metadata.AvailablePageSizes)) {
            element.getAvailablePageSizes().reset(metadata.AvailablePageSizes);
        }
    }

});