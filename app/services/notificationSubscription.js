/**
 *
 * @type {{startConnection, reconnection, subscribe, unsubscribe, stopConnection, on, isDisconnected}}
 */
var notificationSubscription = ( function() {
    var subscription = {};
    var hubProxy;
    var hubName;
    var connection;
    var onSuccessCb;
    var onErrorCb;
    var isConnected = false;
    var serverUrl;

    /**
     *
     * @param newHubName
     * @param onSuccess
     * @param onError
     */
    var setUpConnection = function( newHubName, onSuccess, onError ) {
        onSuccessCb = onSuccess || onSuccessCb;
        onErrorCb = onError || onErrorCb;
        hubName = newHubName || hubName;
        serverUrl = serverUrl || InfinniUI.config.signalRServerUrl || InfinniUI.config.serverUrl;
        connection = $.hubConnection( serverUrl, InfinniUI.config.signalROptions );
        hubProxy = connection.createHubProxy( hubName );

        if( _.size( subscription ) > 0 ) {
            eventSwitcher( 'on' );
            startConnection();
        }
    };

    /**
     *
     * @param routingKey
     * @param callback
     * @param context
     */
    var subscribe = function( routingKey, callback, context ) {
        if( !subscription[ routingKey ] ) {
            subscription[ routingKey ] = [];
            if( hubProxy ) {
                hubProxy.on( routingKey, onReceived( routingKey ) );
            }
        }
        subscription[ routingKey ].push( { context: context, callback: callback } );

        if( !isConnected && hubProxy ) {
            startConnection();
        }
    };

    /**
     *
     * @param state
     */
    var eventSwitcher = function( state ) {
        for( var routingKey in subscription ) {
            if( state === 'on' ) {
                hubProxy.on( routingKey, onReceived( routingKey ) );
            } else {
                hubProxy.off( routingKey );
            }
        }
    };

    /**
     *
     * @param routingKey
     * @param context
     */
    var unsubscribe = function( routingKey, context ) {
        if( context ) {
            var routingKeyArr = subscription[ routingKey ];
            for( var i = 0, ii = routingKeyArr.lenght; i < ii; i += 1 ) {
                if( routingKeyArr[ i ].context == context ) {
                    routingKeyArr.splice( i, 1 );
                }
            }
            if( routingKeyArr.length !== 0 ) {
                return;
            }
        }

        if( subscription[ routingKey ] ) {
            delete subscription[ routingKey ];
            if( hubProxy ) {
                hubProxy.off( routingKey );
            }
        }
        checkHandlers();
    };

    /**
     *
     * @param routingKey
     * @returns {Function}
     */
    var onReceived = function( routingKey ) {
        return function( message ) {
            var routingKeyArr = subscription[ routingKey ];
            if( routingKeyArr ) {
                for( var i = 0, ii = routingKeyArr.length; i < ii; i += 1 ) {
                    routingKeyArr[ i ].callback( routingKeyArr[ i ].context, { message: message } );
                }
            }
        };
    };

    /**
     * @description start signalR connection
     */
    var startConnection = function() {
        isConnected = true;

        connection.start()
            .done( function() {
                console.log( 'signalR: connection is started' );
                if( typeof onSuccessCb === 'function' ) {
                    onSuccessCb();
                }
            } )
            .fail( function() {
                console.log( 'signalR: connection fail' );
                isConnected = false;
                if( typeof onErrorCb === 'function' ) {
                    onErrorCb();
                }
            } );
    };

    /**
     * @description stop signalR connection
     */
    var stopConnection = function() {
        if( hubProxy ) {
            isConnected = false;

            eventSwitcher( 'off' );
            hubProxy = null;
            connection.stop();
        }
    };

    /**
     * @description do reconnection
     */
    var reconnection = function() {
        if( connection && hubProxy ) {
            stopConnection();
        }
        setUpConnection();
    };

    /**
     *
     */
    var checkHandlers = function() {
        if( _.size( subscription ) === 0 ) {
            stopConnection();
        }
    };

    /**
     *
     * @param eventName
     * @param callback
     */
    var on = function( eventName, callback ) {
        if( !connection ) {
            console.error( 'Необходимо сначала установить соединение с сервером' );
        }
        if( connection[ eventName ] ) {
            connection[ eventName ]( callback );
        }
    };

    /**
     *
     * @returns {boolean}
     */
    var isDisconnected = function() {
        return $.connection.isDisconnecting( connection );
    };

    return {
        startConnection: setUpConnection,
        reconnection: reconnection,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        stopConnection: stopConnection,
        on: on,
        isDisconnected: isDisconnected
    };
} )();

InfinniUI.global.notificationSubscription = notificationSubscription;
