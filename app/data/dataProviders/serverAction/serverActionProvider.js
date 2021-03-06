/**
 *
 * @constructor
 */
var ServerActionProvider = function() {
};

/**
 *
 * @param requestData
 * @param resultCallback
 * @param onSuccess
 * @param onError
 * @returns {number}
 */
ServerActionProvider.prototype.request = function( requestData, resultCallback, onSuccess, onError ) {
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

            if( typeof resultCallback === 'function' ) {
                resultCallback( args );
            }

            if( typeof onSuccess === 'function' ) {
                onSuccess( args );
            }
        },
        error: function( data ) {
            var args = {
                requestId: requestId,
                data: data
            };

            if( typeof resultCallback === 'function' ) {
                resultCallback( args );
            }

            if( typeof onError === 'function' ) {
                onError( args );
            }
        }
    } );

    return requestId;
};

/**
 *
 * @param requestData
 * @param resultCallback
 * @param onSuccess
 * @param onError
 */
ServerActionProvider.prototype.download = function( requestData, resultCallback, onSuccess, onError ) {
    new DownloadExecutor( resultCallback, onSuccess, onError )
        .run( requestData );
};

InfinniUI.Providers.ServerActionProvider = ServerActionProvider;
