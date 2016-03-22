function ServerActionBuilder() {
    this.build = function (context, args) {
        var builder = args.builder,
            metadata = args.metadata,
            parentView = args.parentView;

        var action = new ServerAction(parentView);
        var provider = window.providerRegister.build('ServerActionProvider', metadata);

        //action.setProperty('linkView', linkView);
        action.setProperty('provider', provider);

        var parameters = {};

        if (Array.isArray(metadata.Parameters)) {
            metadata.Parameters.forEach(function (metadata) {
                var param = builder.buildType('Parameter', metadata, {parentView: parentView});
                parameters[param.getName()] = param;
            });
            action.setParameters(parameters);
        }

        if (metadata.ContentType) {
            action.setProperty('contentType', metadata.ContentType);
        }

        return action;
    }
}
