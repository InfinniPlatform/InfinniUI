/**
 * @constructor
 */
InfinniUI.ContextMenuService = ( function() {
    var exchange = InfinniUI.global.messageBus;

    exchange.subscribe( messageTypes.onContextMenu.name, function( context, args ) {
        var message = args.value;
        initContextMenu( getSourceElement( message.source ), message.content );
    } );

    function getSourceElement( source ) {
        return source.control.controlView.$el;
    }

    function initContextMenu( $element, content ) {
        $element.on( 'contextmenu', function( event ) {
            event.preventDefault();

            exchange.send( messageTypes.onOpenContextMenu.name, { x: event.pageX, y: event.pageY } );
        } );
    }
} )();
