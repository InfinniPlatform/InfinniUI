/**
 *
 * @constructor
 */
function LinkViewBuilderBase() {
}

_.extend( LinkViewBuilderBase.prototype, {

    /**
     *
     * @param context
     * @param args
     * @returns {LinkView}
     */
    build: function( context, args ) {
        var metadata = args.metadata;
        var parentView = this.getParentViewByOpenMode( args, metadata.OpenMode );
        var linkView = new LinkView( parentView );
        var viewTemplate = this.getViewTemplate( args, parentView );

        linkView.setViewTemplate( viewTemplate );

        if( 'OpenMode' in metadata ) {
            linkView.setOpenMode( metadata.OpenMode );
        }

        if( 'Container' in metadata ) {
            linkView.setContainer( metadata.Container );
        }

        if( 'DialogWidth' in metadata ) {
            linkView.setDialogWidth( metadata.DialogWidth );
        }

        return linkView;
    },

    /**
     *
     */
    getViewTemplate: function() {
        throw new Error( 'LinkViewBuilderBase.getViewTemplate: В потомке LinkViewBuilderBase не переопределен метод getViewTemplate.' );
    },

    /**
     *
     * @param params
     * @param viewMetadata
     * @param parentView
     * @param onViewReadyHandler
     */
    buildViewByMetadata: function( params, viewMetadata, parentView, onViewReadyHandler ) {
        var builder = params.builder;
        var parameters = this.buildParameters( params );

        if( viewMetadata !== null && typeof viewMetadata !== 'undefined' ) {
            var view = builder.buildType( 'View', viewMetadata, {
                parentView: parentView,
                parent: parentView,
                params: parameters,
                suspended: params.suspended
            } );

            onViewReadyHandler( view );

        } else {
            InfinniUI.global.logger.error( 'LinkViewBuilderBase.buildViewByMetadata: view metadata for ' + params.metadata + ' not found.' );
        }
    },

    /**
     *
     * @param params
     * @returns {*}
     */
    buildParameters: function( params ) {
        var parametersMetadata = params.metadata[ 'Parameters' ];
        var builder = params.builder;
        var parentView = params.parentView;
        var result = {};
        var parameter;

        if( typeof parametersMetadata !== 'undefined' && parametersMetadata !== null ) {
            for( var i = 0; i < parametersMetadata.length; i++ ) {
                if( typeof parametersMetadata[ i ].Value !== 'undefined' ) {
                    parameter = builder.buildType( 'Parameter', parametersMetadata[ i ], {
                        parentView: parentView,
                        basePathOfProperty: params.basePathOfProperty
                    } );
                    result[ parameter.getName() ] = parameter;
                }
            }
        }
        return result;
    },

    /**
     *
     * @param params
     * @param mode
     * @returns {*}
     */
    getParentViewByOpenMode: function( params, mode ) {
        if( mode === null || typeof mode === 'undefined' || mode == 'Default' ) {
            return params.parentView.getApplicationView();
        }

        if( mode == 'Container' ) {
            var containerName = params.metadata.Container;
            var container = InfinniUI.global.containers[ containerName ];

            if( container ) {
                return container.getView();
            } else {
                return params.parentView;
            }
        }

        return params.parentView;
    }

} );

InfinniUI.LinkViewBuilderBase = LinkViewBuilderBase;
