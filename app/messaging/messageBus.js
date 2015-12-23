function MessageBus(view) {
    var subscriptions = {};

    this.send = function (messageType, messageBody) {
        if (subscriptions[messageType]) {
            var context;
            if (view && view.getContext) {
                context = view.getContext();
            }
            _.each(subscriptions[messageType], function (handler) {
                handler(context, { value: messageBody });
            });
        }
    };

    this.subscribe = function (messageType, messageHandler) {
        if (!subscriptions[messageType]) {
            subscriptions[messageType] = [];
        }
        
        subscriptions[messageType].push(messageHandler);
    };

    this.unsubscribeByType = function (messageType) {
        if (subscriptions[messageType]) {
            delete subscriptions[messageType];
        }
    };

    this.getView = function () {
        return view;
    };
}

window.InfinniUI.global.messageBus = new MessageBus();