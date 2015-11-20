/**
 * @description Отображает всплывающие сообщения на событие onNotifyUser.
 * Используется плдагин http://codeseven.github.io/toastr/
 */
InfinniUI.NotifyService = (function () {

    var exchange = window.InfinniUI.global.messageBus;

    exchange.subscribe(messageTypes.onNotifyUser, function (message) {
        var
            messageText = message.messageText,
            messageType = message.messageType || 'info';

        var type;

        switch (messageType) {
            case 'success':
            case 'error':
            case 'warning':
            case 'info':
                type = messageType;
                break;
            default:
                type = 'info';
        }

        if (typeof toastr !== 'undefined') {
            toastr[type](messageText);
        }

    });
})();