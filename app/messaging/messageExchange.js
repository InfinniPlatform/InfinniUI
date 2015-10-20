function MessageExchange() {
    var subscriptions = [];

    this.send = function (messageType, messageBody) {
        _.each(subscriptions, function (subscription) {
            if (subscription.messageType.name == messageType.name) {
                subscription.handle(messageBody);
            }
        });
    };

    this.subscribe = function (messageType, messageHandler) {
        var subscription = new Subscription(messageType, messageHandler);
        subscriptions.push(subscription);

        return subscription;
    };

    this.unsubscribeByType = function(messageType){
        subscriptions = _.filter(subscriptions,
            function(item){
                return item.messageType.name != messageType.name;
            });
    };
}