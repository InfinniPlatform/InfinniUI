( function() {

    var $target = $( 'body' );

    InfinniUI.global.messageBus.subscribe( 'onViewCreated', function( context, args ) {
        if( args.value.openMode === 'Default' && InfinniUI.routerService ) {
            InfinniUI.routerService.setContext( args.value.view.context );
            InfinniUI.routerService.startRouter();
        }
    } );

    InfinniUI.openHomePage( $target );

    if( ApplicationExample.config.enableGetCurrentUser ) {
        setCurrentUser();
    }
} )();

function setCurrentUser() {
    ApplicationExample.user = {
        onReadyDeferred: $.Deferred(),
        onReady: function( handler ) {
            this.onReadyDeferred.done( handler );
        }
    };

    refreshUserInfo();
}

function refreshUserInfo() {
    var authProvider = InfinniUI.global.session;
    authProvider.getCurrentUser(
        function( result ) {
            ApplicationExample.user.onReadyDeferred.resolve( result );
        },
        function( error ) {
            ApplicationExample.user.onReadyDeferred.resolve( null );
        }
    );
}
