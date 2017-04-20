var buttonBuilderMixin = {
    applyButtonMetadata: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        var builder = params.builder;

        this.initTemplatingContent( params );

        if ( metadata.Action ) {
            var executorBuilderParams = {
                parentView: params.parentView,
                parent: element,
                basePathOfProperty: params.basePathOfProperty
            };
            var onClickExecutor = Executor( metadata.Action, builder, executorBuilderParams );
            element.onClick( onClickExecutor );
        }
    },

    initTemplatingContent: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        var builder = params.builder;
        var contentTemplate, contentBinding;

        if( 'ContentTemplate' in metadata ) {
            contentTemplate = this.buildContentTemplate( metadata[ 'ContentTemplate' ], params );
            element.setContentTemplate( contentTemplate );
        }

        if( 'Content' in metadata ) {
            contentBinding = builder.buildBinding( metadata[ 'Content' ], {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            } );

            contentBinding.bindElement( element, 'content' );
        }
    },

    buildContentTemplate: function( templateMetadata, params ) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty;

        return function( context, args ) {
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView,
                basePathOfProperty: basePathOfProperty
            };

            return builder.build( templateMetadata, argumentForBuilder );
        };
    }
};