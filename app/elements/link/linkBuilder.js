/**
 * @augments ButtonBuilder
 * @mixes routerServiceMixin
 * @constructor
 */
function LinkBuilder() {
    _.superClass( LinkBuilder, this );
}

InfinniUI.LinkBuilder = LinkBuilder;

_.inherit( LinkBuilder, ButtonBuilder );

_.extend( LinkBuilder.prototype, routerServiceMixin, {

    /**
     *
     * @param params
     * @returns {Link}
     */
    createElement: function( params ) {
        return new Link( params.parent );
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ButtonBuilder.prototype.applyMetadata.call( this, params );

        var metadata = params.metadata;
        var element = params.element;

        if( metadata.Href && typeof metadata.Href === 'string' ) {
            element.setHref( metadata.Href );
        } else if( metadata.Href ) {
            var pathName = metadata.Href.Name;
            var hrefParams = metadata.Href.Params;
            var query = metadata.Href.Query;
            var href = routerService.getLinkByName( pathName, 'no' );
            var newHref = href;

            element.setHref( newHref );

            if( hrefParams ) {
                for( var i = 0, ii = hrefParams.length; i < ii; i += 1 ) {
                    if( typeof hrefParams[ i ].Value === 'string' ) {
                        if( element.getHref() !== newHref ) {
                            newHref = element.getHref();
                        }
                        newHref = this.replaceParamsInHref( newHref, hrefParams[ i ].Name, hrefParams[ i ].Value );
                        element.setHref( newHref );
                    } else {
                        this.bindParams( params, hrefParams[ i ].Name, hrefParams[ i ].Value, newHref );
                    }
                }
            }
            if( query ) {
                for( var j = 0, jj = query.length; j < jj; j += 1 ) {
                    if( typeof query[ j ].Value === 'string' ) {
                        if( element.getHref() !== newHref ) {
                            newHref = element.getHref();
                        }
                        newHref = this.replaceParamsInQuery( newHref, query[ j ].Name, query[ j ].Value );
                        element.setHref( newHref );
                    } else {
                        this.bindQuery( params, query[ j ].Name, query[ j ].Value, newHref );
                    }
                }
            }
        }

        if( metadata.Target ) {
            element.setTarget( metadata.Target );
        }
    }

} );
