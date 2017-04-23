var eventHandlerMixin = {
    /**
     *
     * @param {String} name
     * @param {*} handler
     * @callback handler
     * @returns {boolean}
     */
    addEventHandler: function( name, handler ) {
        this.initEventHandlerMixin();

        if( name === null || typeof name === 'undefined' ) {
            return false;
        }

        if( handler === null || typeof handler === 'undefined' ) {
            return false;
        }

        if( typeof this.eventHandlers[ name ] === 'undefined' ) {
            this.eventHandlers[ name ] = [];
        }

        var handlers = this.eventHandlers[ name ];

        if( handlers.indexOf( handler ) === -1 ) {
            handlers.push( handler );
        }
    },

    /**
     * @description Вызывает обработчики указанного события.
     * Формат вызова callEventHandler(name, [data],[handler])
     * @param {string} name Название события
     * @callback [callback] Функцию в которую будут переданы результат вызова каждого обработчика
     */
    callEventHandler: function( name ) {
        if( typeof this.eventHandlers === 'undefined' || name === null || typeof name === 'undefined' ) {
            return;
        }
        var handlers = this.eventHandlers[ name ];

        if( typeof handlers === 'undefined' ) {
            return;
        }

        var args = Array.prototype.slice.call( arguments, 1 );
        var params = args.pop();
        var callback;

        if( typeof params === 'function' ) {
            callback = params;
        }
        params = args.pop();

        handlers.forEach( function( handler ) {
            var result = handler.apply( undefined, params );

            if( typeof callback !== 'undefined' ) {
                callback( result );
            }
        } );
    },

    /**
     * @private
     */
    initEventHandlerMixin: function() {
        if( typeof this.eventHandlers === 'undefined' ) {
            this.eventHandlers = {};
        }
    }

};

InfinniUI.Mixins.eventHandlerMixin = eventHandlerMixin;
