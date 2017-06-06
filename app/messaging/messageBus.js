/**
 *
 * @param view
 * @constructor
 */
function MessageBus( view ) {
    var subscriptions = {};

    /**
     *
     * @param messageType
     * @param messageBody
     */
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

    /**
     *
     * @param messageType
     * @param messageHandler
     */
    this.subscribe = function( messageType, messageHandler ) {
        messageType = patchMessageType( messageType );
        if( !subscriptions[ messageType ] ) {
            subscriptions[ messageType ] = [];
        }

        subscriptions[ messageType ].push( messageHandler );
    };

    /**
     *
     * @param messageType
     */
    this.unsubscribeByType = function( messageType ) {
        messageType = patchMessageType( messageType );
        if( subscriptions[ messageType ] ) {
            delete subscriptions[ messageType ];
        }
    };

    /**
     *
     * @returns {*}
     */
    this.getView = function() {
        return view;
    };

    this.dispose = function() {
        subscriptions = {};
    };

    function patchMessageType( messageType ) {
        if( typeof messageType === 'object' && typeof messageType.name !== 'undefined' ) {
            messageType = messageType.name;
        }

        return messageType;
    }
}

InfinniUI.global.messageBus = new MessageBus();
