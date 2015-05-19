describe('MessageBus', function () {
    var bus;

    beforeEach(function () {
        bus = new MessageBus();
    });

    describe('getExchange', function () {
        it('should throw error for empty exchangeName', function () {
            try {
                bus.getExchange();
            } catch (e) {
                assert.ok(true);
                return;
            }

            assert.fail();
        });

        it('should return exchange', function () {
            var exchange = bus.getExchange('test');

            assert.isNotNull(exchange);
        });
    })
});