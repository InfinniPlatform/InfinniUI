function MessageBus() {
    var messageExchanges = {};

    this.getExchange = function (exchangeName) {
        if (_.isEmpty(exchangeName)) {
            throw new Error('exchangeName should be specified');
        }

        if (!messageExchanges.hasOwnProperty(exchangeName)) {
            messageExchanges[exchangeName] = new MessageExchange();
        }

        return messageExchanges[exchangeName];
    };
}

window.messageBus = new MessageBus();