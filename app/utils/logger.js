var LOG_LEVEL = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    trace: 5
};

function Logger( level ) {
    this.messages = [];
    this.setLevel( level || LOG_LEVEL.debug );


    this.showMessages = true;
}

_.extend( Logger.prototype, {
    getLevel: function() {
        return this.level;
    },

    setLevel: function( level ) {
        this.level = level;
    },

    addMessage: function( messageType, message ) {
        this.messages.push( {
            type: messageType,
            message: message
        } );
    },

    debug: function( message ) {
        if( this.level > LOG_LEVEL.debug ) {
            return;
        }

        if( this.showMessages ) {
            console.debug( message.message || message );
        }

        this.addMessage( LOG_LEVEL.debug, message );
    },

    info: function( message ) {
        if( this.level > LOG_LEVEL.info ) {
            return;
        }

        if( this.showMessages ) {
            console.info( message.message || message );
        }

        this.addMessage( LOG_LEVEL.info, message );
    },

    warn: function( message ) {
        if( this.level > LOG_LEVEL.warn ) {
            return;
        }

        if( this.showMessages ) {
            console.warn( message.message || message );
        }

        this.addMessage( LOG_LEVEL.warn, message );
    },

    error: function( message ) {
        if( this.level > LOG_LEVEL.error ) {
            return;
        }

        if( this.showMessages ) {
            console.error( message.message || message );
        }

        this.addMessage( LOG_LEVEL.error, message );
    },

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
