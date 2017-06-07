/**
 *
 * @constructor
 */
function EventsManager() {
    this.handlers = {};
}

InfinniUI.EventsManager = EventsManager;

/**
 *
 * @param event
 * @param handler
 * @returns {{off}}
 */
EventsManager.prototype.on = function( event, handler ) {
    if ( typeof this.handlers[ event ] === 'undefined' ) {
        this.handlers[ event ] = [];
    }

    var handlers = this.handlers[ event ];
    handlers.push( handler );

    return {
        off: this.off.bind( this, event, handler )
    };
};

/**
 *
 * @param event
 * @param handler
 */
EventsManager.prototype.off = function( event, handler ) {
    if ( typeof event !== 'undefined' ) {
        var handlers = this.handlers[ event ];

        if ( Array.isArray( handlers ) ) {
            for( var i = 0; i < handlers.length; i = i + 1 ) {
                if ( handlers[ i ] === handler ) {
                    handlers.splice( i, 1 );
                    break;
                }
            }
        }
    }
};

/**
 *
 * @param event
 */
EventsManager.prototype.trigger = function( event ) {
    var handlers = this.handlers[ event ];
    var args = Array.prototype.slice.call( arguments, 1 );
    var deferred = $.Deferred();

    if ( Array.isArray( handlers ) ) {
        var results = handlers.map( function( handler ) {
            return handler.apply( null, args );
        } );
        $.when.apply( $, results )
            .done( function() {
                var results = Array.prototype.slice.call( arguments );
                var cancel = results.some( function( res ) {
                    return res === false;
                } );

                if ( cancel ) {
                    deferred.reject();
                } else {
                    deferred.resolve( results );
                }
            } )
            .fail( function() {
                deferred.reject();
            } );
    } else {
        deferred.resolve();
    }

    return deferred.promise();
};
