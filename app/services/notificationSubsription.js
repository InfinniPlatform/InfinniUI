var notificationSubsription = (function() {
	var subscription = {},
			hubProxy,
			connection,
			isConnected = false;

	var setUpConnection = function(hubName) {
		connection = $.hubConnection(window.InfinniUI.config.serverUrl);
		hubProxy = connection.createHubProxy(hubName);

		if( _.size(subscription) > 0 ) {
			eventSwitcher('on');
			startConnection();
		}
	};

	var subscribe = function(routingKey, callback, context) {
		if( !subscription[routingKey] ) {
			subscription[routingKey] = [];
			if( hubProxy ) {
				hubProxy.on(routingKey, onReceived(routingKey));
			}
		}
		subscription[routingKey].push({context: context, callback: callback});

		if( !isConnected && hubProxy ) {
			startConnection();
		}
	};

	var eventSwitcher = function(state) {
		for( var routingKey in subscription ) {
			if( state === 'on' ) {
				hubProxy.on(routingKey, onReceived(routingKey));
			} else {
				hubProxy.off(routingKey);
			}
		}
	};

	var unsubscribe = function(routingKey, context) {
		if( context ) {
			var routingKeyArr = subscription[routingKey];
			for( var i = 0, ii = routingKeyArr.lenght; i < ii; i += 1 ) {
				if( routingKeyArr[i].context == context ) {
					routingKeyArr.splice(i, 1);
				}
			}
			if( routingKeyArr.length !== 0 ) {
				return;
			}
		}
		
		if( subscription[routingKey] ) {
			delete subscription[routingKey];
			if( hubProxy ) {
				hubProxy.off(routingKey);
			}
		}
		checkHandlers();
	};

	var onReceived = function(routingKey) {
		return function(message) {
			var routingKeyArr = subscription[routingKey];
			if( routingKeyArr ) {
				for( var i = 0, ii = routingKeyArr.length; i < ii; i += 1 ) {
					routingKeyArr[i].callback(routingKeyArr[i].context, {message: message});
				}
			}
		};
	};

	var startConnection = function() {
		isConnected = true;

		connection.start()
			.done(function() {
				console.log( 'signalR: connection is started' );
			})
			.fail(function() {
				console.log( 'signalR: connection fail' );
				isConnected = false;
			});
	};

	var stopConnection = function() {
		isConnected = false;

		eventSwitcher('off');
		hubProxy = null;
		connection.stop();
	};

	var checkHandlers = function() {
		if( _.size(subscription) === 0 ) {
			stopConnection();
		}
	};

	return {
		startConnection: setUpConnection,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		stopConnection: stopConnection
	};
})();

InfinniUI.global.notificationSubsription = notificationSubsription;
