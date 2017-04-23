function EventManager() {
    this.handlers = {};
}

EventManager.prototype.on = function( name, handler ) {
    if ( typeof this.handlers[ name ] === 'undefined' ) {
        this.handlers[ name ] = [];
    }
    this.handlers[ name ].push( handler );
    return this;
};

EventManager.prototype.trigger = function( name, message, context ) {
    var eventHandlers = this.handlers[ name ];
    var response = true;

    if ( Array.isArray( eventHandlers ) ) {
        response = eventHandlers
            .map( function( handler ) {
                return handler.call( context, message );
            } )
            .every( function( result ) {
                return result !== false;
            } );
    }
    return response;
};

InfinniUI.EventManager = EventManager;
