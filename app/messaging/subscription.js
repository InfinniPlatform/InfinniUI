function Subscription(messageType, messageHandler) {
    this.messageType = messageType;

    this.handle = function (messageBody) {
        messageHandler(messageBody);
    };
}