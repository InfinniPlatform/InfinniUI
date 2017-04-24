/**
 *
 * @mixin
 */
var dataSourceValidationNotifierMixin = {
    /**
     * @param dataSource
     */
    initNotifyValidation: function( dataSource ) {
        dataSource.onErrorValidator( this.notifyOnValidationError.bind( this ) );
    },

    /**
     * @param context
     * @param args
     */
    notifyOnValidationError: function( context, args ) {
        var result = args.value;

        if ( typeof result === 'undefined' || result === null || result[ 'IsValid' ] || !Array.isArray( result[ 'Items' ] ) ) {
            return;
        }

        result[ 'Items' ].forEach( function( item ) {
            var exchange = InfinniUI.global.messageBus;
            exchange.send( messageTypes.onNotifyUser, { item: item, messageText: item.Message, messageType: 'error' } );
        } );
    }

};

InfinniUI.dataSourceValidationNotifierMixin = dataSourceValidationNotifierMixin;
