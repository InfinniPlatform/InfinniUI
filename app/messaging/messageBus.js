function MessageBus( view ) {
    var subscriptions = {};

    this.send = function( messageType, messageBody ) {
        messageType = patchMessageType( messageType );
        if( subscriptions[ messageType ] ) {
            var context;
            if( view && view.getContext ) {
                context = view.getContext();
            }
            subscriptions[ messageType ].forEach( function( handler ) {
                handler( context, { value: messageBody } );
            } );
        }
    };

    this.subscribe = function( messageType, messageHandler ) {
        messageType = patchMessageType( messageType );
        if( !subscriptions[ messageType ] ) {
            subscriptions[ messageType ] = [];
        }

        subscriptions[ messageType ].push( messageHandler );
    };

    this.unsubscribeByType = function( messageType ) {
        messageType = patchMessageType( messageType );
        if( subscriptions[ messageType ] ) {
            delete subscriptions[ messageType ];
        }
    };

    this.getView = function() {
        return view;
    };

    function patchMessageType( messageType ) {
        if( typeof messageType === 'object' && typeof messageType.name !== 'undefined' ) {
            messageType = messageType.name;
        }

        return messageType;
    }
}

InfinniUI.global.messageBus = new MessageBus();
