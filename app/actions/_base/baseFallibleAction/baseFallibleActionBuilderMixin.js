var BaseFallibleActionBuilderMixin = {
    applyBaseFallibleActionMetadata: function(action, params) {
        var metadata = params.metadata;

        if('OnSuccess' in metadata) {
            action.setProperty('onSuccessHandler', function(args) {
                new ScriptExecutor(action.parentView).executeScript(metadata.OnSuccess.Name || metadata.OnSuccess, args);
            });
        }

        if('OnError' in metadata) {
            action.setProperty('onErrorHandler', function(args) {
                new ScriptExecutor(action.parentView).executeScript(metadata.OnError.Name || metadata.OnError, args);
            });
        }
    }
};