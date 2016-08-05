var BaseActionBuilderMixin = {
    applyBaseActionMetadata: function(action, params) {
        var metadata = params.metadata,
            parentView = this.parentView;

        if('OnExecuted' in metadata) {
            action.setProperty('onExecutedHandler', function(args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnExecuted.Name || metadata.OnExecuted, args);
            });
        }
    }
};