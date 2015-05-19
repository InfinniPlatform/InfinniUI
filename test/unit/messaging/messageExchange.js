describe('MessageExchange', function () {
    var messageExchange;

    beforeEach(function () {
        messageExchange = new MessageBus().getExchange('test');
    });

    describe('send', function () {
        it('should send', function () {
            var flag = 0;

            messageExchange.subscribe(messageTypes.onViewOpened, function (obj) {
                flag += obj;
            });
            messageExchange.subscribe(messageTypes.onViewOpened, function (obj) {
                flag += obj;
            });
            messageExchange.subscribe(messageTypes.onViewOpened, function (obj) {
                flag += obj;
            });

            messageExchange.send(messageTypes.onViewOpened, 2);

            assert.equal(flag, 6);
        });

        it('should deliver message to valid subscribers', function () {
            var flag1 = 0,
                flag2 = 0;

            messageExchange.subscribe(messageTypes.onViewOpened, function (obj) {
                flag1 += obj;
            });
            messageExchange.subscribe(messageTypes.onViewOpened, function (obj) {
                flag1 += obj;
            });
            messageExchange.subscribe(messageTypes.onViewClosed, function (obj) {
                flag2 += obj;
            });
            messageExchange.subscribe(messageTypes.onViewClosed, function (obj) {
                flag2 += obj;
            });

            messageExchange.send(messageTypes.onViewOpened, 1);
            messageExchange.send(messageTypes.onViewClosed, 2);

            assert.equal(flag1, 2);
            assert.equal(flag2, 4);
        });
    });
});