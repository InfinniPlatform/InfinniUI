function RouteToActionBuilder() {
}

_.extend( RouteToActionBuilder.prototype, BaseActionBuilderMixin, routerServiceMixin, {

    build: function( context, args ) {
        var action = new RouteToAction();
        var newHref = routerService.getLinkByName( args.metadata.Name, 'no' );
        var hrefParams = args.metadata.Params;
        var query = args.metadata.Query;
        var replace = args.metadata.Replace; // when true, can delete url from history

        action.setReplace( replace );
        action.setHref( newHref );
        args.element = action;

        if( hrefParams ) {
            for( var i = 0, ii = hrefParams.length; i < ii; i += 1 ) {
                if( typeof hrefParams[ i ].Value === 'string' ) {
                    if( action.getHref() !== newHref ) {
                        newHref = action.getHref();
                    }
                    newHref = this.replaceParamsInHref( newHref, hrefParams[ i ].Name, hrefParams[ i ].Value );
                    action.setHref( newHref );
                } else {
                    this.bindParams( args, hrefParams[ i ].Name, hrefParams[ i ].Value, newHref );
                }
            }
        }

        if( query ) {
            for( var j = 0, jj = query.length; j < jj; j += 1 ) {
                if( typeof query[ j ].Value === 'string' ) {
                    if( action.getHref() !== newHref ) {
                        newHref = action.getHref();
                    }
                    newHref = this.replaceParamsInQuery( newHref, query[ j ].Name, query[ j ].Value );
                    action.setHref( newHref );
                } else {
                    this.bindQuery( args, query[ j ].Name, query[ j ].Value, newHref );
                }
            }
        }
        return action;
    }

} );

window.InfinniUI.RouteToActionBuilder = RouteToActionBuilder;
