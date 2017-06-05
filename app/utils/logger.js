var LOG_LEVEL = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    trace: 5
};

/**
 *
 * @param level
 * @constructor
 */
function Logger( level ) {
    this.messages = [];
    this.setLevel( level || LOG_LEVEL.debug );


    this.showMessages = true;
}

_.extend( Logger.prototype, {

    /**
     *
     * @returns {*}
     */
    getLevel: function() {
        return this.level;
    },

    /**
     *
     * @param level
     */
    setLevel: function( level ) {
        this.level = level;
    },

    /**
     *
     * @param messageType
     * @param message
     */
    addMessage: function( messageType, message ) {
        this.messages.push( {
            type: messageType,
            message: message
        } );
    },

    /**
     *
     * @param message
     */
    debug: function( message ) {
        if( this.level > LOG_LEVEL.debug ) {
            return;
        }

        if( this.showMessages ) {
            console.debug( message.message || message );
        }

        this.addMessage( LOG_LEVEL.debug, message );
    },

    /**
     *
     * @param message
     */
    info: function( message ) {
        if( this.level > LOG_LEVEL.info ) {
            return;
        }

        if( this.showMessages ) {
            console.info( message.message || message );
        }

        this.addMessage( LOG_LEVEL.info, message );
    },

    /**
     *
     * @param message
     */
    warn: function( message ) {
        if( this.level > LOG_LEVEL.warn ) {
            return;
        }

        if( this.showMessages ) {
            console.warn( message.message || message );
        }

        this.addMessage( LOG_LEVEL.warn, message );
    },

    /**
     *
     * @param message
     */
    error: function( message ) {
        if( this.level > LOG_LEVEL.error ) {
            return;
        }

        if( this.showMessages ) {
            console.error( message.message || message );
        }

        this.addMessage( LOG_LEVEL.error, message );
    },

    /**
     *
     * @param message
     */
    trace: function( message ) {
        if( this.level > LOG_LEVEL.trace ) {
            return;
        }

        if( this.showMessages ) {
            console.error( message.message || message );
        }

        this.addMessage( LOG_LEVEL.trace, message );
    }

} );

InfinniUI.global.logger = new Logger();
