var BaseFallibleActionBuilderMixin = {
    applyBaseFallibleActionMetadata: function( action, params ) {
        var metadata = params.metadata;

        var executorBuilderParams = {
            parentView: params.parentView,
            parent: params.parent,
            basePathOfProperty: params.basePathOfProperty
        };

        if( 'OnSuccess' in metadata ) {
            var onSuccessExecutor = Executor( metadata.OnSuccess, params.builder, executorBuilderParams );
            action.setProperty( 'onSuccessHandler', onSuccessExecutor );
        }

        if( 'OnError' in metadata ) {
            var onErrorExecutor = Executor( metadata.OnError, params.builder, executorBuilderParams );
            action.setProperty( 'onErrorHandler', onErrorExecutor );
        }
    }
};