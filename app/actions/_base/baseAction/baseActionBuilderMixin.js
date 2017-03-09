var BaseActionBuilderMixin = {
    applyBaseActionMetadata: function(action, params) {
        var metadata = params.metadata;

        if('OnExecuted' in metadata) {

            var executorBuilderParams = {
                parentView: params.parentView,
                parent: params.parent,
                basePathOfProperty: params.basePathOfProperty
            };

            var executor = Executor(metadata.OnExecuted, params.builder, executorBuilderParams);
            action.setProperty('onExecutedHandler', executor);
        }
    }
};