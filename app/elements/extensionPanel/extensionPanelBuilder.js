function ExtensionPanelBuilder() {
}

_.inherit(ExtensionPanelBuilder, ContainerBuilder);

_.extend(ExtensionPanelBuilder.prototype, {

    applyMetadata: function (params) {
        var metadata = params.metadata;
        var element = params.element;
        var parentView = params.parentView;
        var builder = params.builder;

        ContainerBuilder.prototype.applyMetadata.call(this, params);

        element.setExtensionName(metadata['ExtensionName']);

        var parameters = {};
        _.each(metadata.Parameters, function (parameterMetadata) {
            var param = builder.buildType('Parameter', parameterMetadata, {parentView: parentView});
            parameters[param.getName()] = param;
        });

        element.setParameters(parameters);
        element.setContext(parentView.getContext());
        element.setBuilder(builder);
    },

    createElement: function (params) {
        var element = new ExtensionPanel(params.parent);

        return element;
    }
});
