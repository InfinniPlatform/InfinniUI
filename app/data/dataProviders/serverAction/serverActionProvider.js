var ServerActionProvider = function() {
};

ServerActionProvider.prototype.request = function( requestData, resultCallback, onSuccess, onError ) {
    var that = this;
    var requestId = Math.round( ( Math.random() * 100000 ) );

    $.ajax( {
        type: requestData.method,
        url: requestData.requestUrl,
        xhrFields: {
            withCredentials: true
        },
        data: requestData.args,
        contentType: requestData.contentType,
        success: function( data ) {
            var args = {
                requestId: requestId,
                data: data
            };

            if( _.isFunction( resultCallback ) ) {
                resultCallback( args );
            }

            if( _.isFunction( onSuccess ) ) {
                onSuccess( args );
            }
        },
        error: function( data ) {
            var args = {
                requestId: requestId,
                data: data
            };

            if( _.isFunction( resultCallback ) ) {
                resultCallback( args );
            }

            if( _.isFunction( onError ) ) {
                onError( args );
            }
        }
    } );

    return requestId;
};

ServerActionProvider.prototype.download = function( requestData, resultCallback, onSuccess, onError ) {
    new DownloadExecutor( resultCallback, onSuccess, onError )
        .run( requestData );
};

window.InfinniUI.Providers.ServerActionProvider = ServerActionProvider;