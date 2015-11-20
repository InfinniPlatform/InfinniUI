function MessageBus() {
    var subscriptions = {};

    this.send = function (messageType, messageBody) {
        if(subscriptions[messageType]){
            _.each(subscriptions[messageType], function (subscription) {
                subscription.handle(messageBody);
            });
        }
    };

    this.subscribe = function (messageType, messageHandler) {
        if(!subscriptions[messageType]){
            subscriptions[messageType] = [];
        }
        var subscription = new Subscription(messageType, messageHandler);
        subscriptions[messageType].push(subscription);

        return subscription;
    };

    this.unsubscribeByType = function(messageType){
        if(subscriptions[messageType]){
            delete subscriptions[messageType];
        }
    };
}

window.InfinniUI.global.messageBus = new MessageBus();