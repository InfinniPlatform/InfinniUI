describe( 'MessageBus', function() {
    var messageBus;

    beforeEach( function() {
        messageBus = InfinniUI.global.messageBus;
    } );

    describe( 'send', function() {
        it( 'should send', function() {
            var flag = 0;

            messageBus.subscribe( 'myEvent', function( context, obj ) {
                flag += obj.value;
            } );
            messageBus.subscribe( 'myEvent', function( context, obj ) {
                flag += obj.value;
            } );
            messageBus.subscribe( 'myEvent', function( context, obj ) {
                flag += obj.value;
            } );

            messageBus.send( 'myEvent', 2 );

            assert.equal( flag, 6 );
        } );

        it( 'should deliver message to valid subscribers', function() {
            var flag1 = 0,
                flag2 = 0;

            messageBus.subscribe( 'myEvent_1', function( context, obj ) {
                flag1 += obj.value;
            } );
            messageBus.subscribe( 'myEvent_1', function( context, obj ) {
                flag1 += obj.value;
            } );
            messageBus.subscribe( 'myEvent_2', function( context, obj ) {
                flag2 += obj.value;
            } );
            messageBus.subscribe( 'myEvent_2', function( context, obj ) {
                flag2 += obj.value;
            } );

            messageBus.send( 'myEvent_1', 1 );
            messageBus.send( 'myEvent_2', 2 );

            assert.equal( flag1, 2, 'first handler flag is right' );
            assert.equal( flag2, 4, 'second handler flag is right' );
        } );
    } );
} );
