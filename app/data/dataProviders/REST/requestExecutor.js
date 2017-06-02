/**
 *
 * @param type
 * @constructor
 */
var RequestExecutorDataStrategy = function( type ) {
    if( typeof this.strategies[ type ] === 'undefined' ) {
        this.strategy = this.strategies.json;
    } else {
        this.strategy = this.strategies[ type ];
    }
};

InfinniUI.RequestExecutorDataStrategy = RequestExecutorDataStrategy;

/**
 *
 * @param requestData
 * @param successCallbackHandler
 * @param failCallbackHandler
 * @returns {*}
 */
RequestExecutorDataStrategy.prototype.request = function( requestData, successCallbackHandler, failCallbackHandler ) {
    return this.strategy.apply( this, Array.prototype.slice.call( arguments ) );
};

/**
 *
 * @type {{json: RequestExecutorDataStrategy.strategies.json, raw: RequestExecutorDataStrategy.strategies.raw}}
 */
RequestExecutorDataStrategy.prototype.strategies = {

    /**
     *
     * @param requestData
     * @param onSuccess
     * @param onFail
     * @returns {*}
     */
    json: function( requestData, onSuccess, onFail ) {
        return $.ajax( {
            type: requestData.method || 'post',
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest( onSuccess ),
            error: function( err ) {
                if( err.status === 200 ) {
                    //@TODO Убрать этот костыль. Нужен т.к. запрос на загрузку файла возвращает 200 и пустой ответ!
                    this.onSuccessRequest( onSuccess )();
                } else {
                    this.onErrorRequest( onFail )( err );
                }
            }.bind( this ),
            data: JSON.stringify( requestData.args ),
            contentType: 'application/json;charset=UTF-8'
        } );
    },

    /**
     *
     * @param requestData
     * @param onSuccess
     * @param onFail
     * @returns {*}
     */
    raw: function( requestData, onSuccess, onFail ) {
        var method = requestData.method || 'post';
        var processData = method.toUpperCase() === 'GET';

        return $.ajax( {
            type: method,
            url: requestData.requestUrl,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest( onSuccess ),
            error: function( err ) {
                if( err.status === 200 ) {
                    //@TODO Убрать этот костыль. Нужен т.к. запрос на загрузку файла возвращает 200 и пустой ответ!
                    this.onSuccessRequest( onSuccess )();
                } else {
                    this.onErrorRequest( onFail )( err );
                }
            }.bind( this ),
            processData: processData,
            contentType: false,
            data: requestData.args
        } );
    }
};

_.extend( RequestExecutorDataStrategy.prototype, ajaxRequestMixin );

/**
 *
 * @param resultCallback
 * @param successCallback
 * @param failCallback
 * @param cache
 * @constructor
 */
function RequestExecutor( resultCallback, successCallback, failCallback, cache ) {

    /**
     *
     * @param data
     */
    var successCallbackHandler = function( data ) {
        if( successCallback ) {
            successCallback( data );
        }
        if( resultCallback ) {
            resultCallback( data );
        }
    };

    /**
     *
     * @param err
     */
    var failCallbackHandler = function( err ) {
        if( failCallback ) {
            failCallback( err );
        }
        if( resultCallback ) {
            resultCallback( err.responseJSON );
        }
    };

    /**
     *
     * @param requestData
     * @param request
     * @returns {*}
     */
    var cacheRequest = function( requestData, request ) {
        if( typeof cache === 'undefined' || cache === null ) {
            return request( requestData );
        } else {
            var data = cache.get( requestData );
            if( data !== false ) {
                console.log( 'Fetch from cache' );
                var defer = $.Deferred();
                successCallbackHandler( data );
                defer.resolve( data );
                return defer.promise();
            }
            return request( requestData ).then( function( data ) {
                cache.set( requestData, data );
            } );
        }
    };

    /**
     *
     * @param type
     * @param requestData
     * @returns {*}
     */
    var request = function( type, requestData ) {
        var strategy = new RequestExecutorDataStrategy( type );

        return strategy.request( requestData, successCallbackHandler, failCallbackHandler );
    };

    /**
     *
     * @param requestData
     * @returns {*}
     */
    this.makeRequest = function( requestData ) {
        return cacheRequest( requestData, request.bind( undefined, 'json' ) );
    };

    /**
     *
     * @param requestData
     * @returns {*}
     */
    this.makeRequestRaw = function( requestData ) {
        return cacheRequest( requestData, request.bind( undefined, 'raw' ) );
    };

}
