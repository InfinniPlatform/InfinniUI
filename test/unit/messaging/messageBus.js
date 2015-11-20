describe('MessageBus', function () {
    var messageBus;

    beforeEach(function () {
        messageBus = new MessageBus();
    });

    describe('send', function () {
        it('should send', function () {
            var flag = 0;

            messageBus.subscribe(messageTypes.onViewOpened.name, function (obj) {
                flag += obj;
            });
            messageBus.subscribe(messageTypes.onViewOpened.name, function (obj) {
                flag += obj;
            });
            messageBus.subscribe(messageTypes.onViewOpened.name, function (obj) {
                flag += obj;
            });

            messageBus.send(messageTypes.onViewOpened.name, 2);

            assert.equal(flag, 6);
        });

        it('should deliver message to valid subscribers', function () {
            var flag1 = 0,
                flag2 = 0;

            messageBus.subscribe(messageTypes.onViewOpened.name, function (obj) {
                flag1 += obj;
            });
            messageBus.subscribe(messageTypes.onViewOpened.name, function (obj) {
                flag1 += obj;
            });
            messageBus.subscribe(messageTypes.onViewClosed.name, function (obj) {
                flag2 += obj;
            });
            messageBus.subscribe(messageTypes.onViewClosed.name, function (obj) {
                flag2 += obj;
            });

            messageBus.send(messageTypes.onViewOpened.name, 1);
            messageBus.send(messageTypes.onViewClosed.name, 2);

            assert.equal(flag1, 2, 'first handler flag is right');
            assert.equal(flag2, 4, 'second handler flag is right');
        });
    });
});