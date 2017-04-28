var FakeRestDataProvider = function() {
    _.superClass( FakeRestDataProvider, this );
};

_.inherit( FakeRestDataProvider, InfinniUI.Providers.RestDataProvider );

_.extend( FakeRestDataProvider.prototype, {

    items: [],
    lastSendedUrl: '',

    send: function( type, successHandler, errorHandler ) {
        var requestId = Math.round( ( Math.random() * 100000 ) );
        var params = this.requestParams[ type ];
        var result = _.clone( this.items );


        var urlString = params.origin + params.path;
        var queryString;

        if( type == 'get' && _.size( params.data ) > 0 ) {
            queryString = InfinniUI.stringUtils.joinDataForQuery( params.data );
            urlString = urlString + '?' + queryString;
        }

        FakeRestDataProvider.prototype.lastSendedUrl = urlString;

        if( params.data ) {
            if ( _.isString( params.data.filter ) ) {
                result = InfinniUI.FilterItems( result, params.data.filter );
            }

            result = result.splice( params.data.skip || 0, params.data.take || 15 );
        }

        setTimeout( function() {
            successHandler( {
                requestId: requestId,
                data: {
                    Result: {
                        Items: result
                    }
                }
            } );
        }, 1 );

        return requestId;
    }

} );
