var BaseActionBuilderMixin = {

    applyBaseActionMetadata: function( action, params ) {
        var metadata = params.metadata;
        var executorBuilderParams = {
            parentView: params.parentView,
            parent: params.parent,
            basePathOfProperty: params.basePathOfProperty
        };

        if( 'OnExecuted' in metadata ) {
            var executor = Executor( metadata.OnExecuted, params.builder, executorBuilderParams );
            action.setProperty( 'onExecutedHandler', executor );
        }

        if( metadata.CanExecute ) {
            var canExecute = Executor( metadata.CanExecute, params.builder, executorBuilderParams );
            action.setProperty( 'canExecute', canExecute );
        }
    }

};
