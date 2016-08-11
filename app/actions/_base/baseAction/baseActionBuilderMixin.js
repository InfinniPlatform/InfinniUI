var BaseActionBuilderMixin = {
    applyBaseActionMetadata: function(action, params) {
        var metadata = params.metadata;

        if('OnExecuted' in metadata) {
            action.setProperty('onExecutedHandler', function(args) {
                new ScriptExecutor(action.parentView).executeScript(metadata.OnExecuted.Name || metadata.OnExecuted, args);
            });
        }
    }
};