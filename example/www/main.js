( function() {

    var $target = $( 'body' );

    InfinniUI.global.messageBus.subscribe( 'onViewCreated', function( context, args ) {
        if( args.value.openMode === 'Default' && InfinniUI.routerService ) {
            InfinniUI.routerService.setContext( args.value.view.context );
            InfinniUI.routerService.startRouter();
        }
    } );

    InfinniUI.openHomePage( $target );

} )();
