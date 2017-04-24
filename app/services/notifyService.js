/**
 * @description Отображает всплывающие сообщения на событие onNotifyUser.
 * Используется плдагин http://codeseven.github.io/toastr/
 */
InfinniUI.NotifyService = ( function() {
    var exchange = InfinniUI.global.messageBus;

    exchange.subscribe( messageTypes.onNotifyUser, function( context, args ) {
        var messageText = args.value.messageText;
        var messageType = args.value.messageType || 'info';
        var type;

        switch( messageType ) {
            case 'success':
            case 'error':
            case 'warning':
            case 'info':
                type = messageType;
                break;
            default:
                type = 'info';
        }

        if( typeof toastr !== 'undefined' ) {
            toastr[ type ]( messageText );
        }

    } );

} )();
