/**
 *
 * @type {{modalWasOpened, modalWasClosed}}
 */
InfinniUI.ModalWindowService = ( function() {
    var modalQueue = [];

    return {

        /**
         *
         * @param obj
         */
        modalWasOpened: function( obj ) {
            if( modalQueue.length != 0 ) {
                var previous = modalQueue[ modalQueue.length - 1 ];

                previous.modal.addClass( 'invisible' );
                previous.background.addClass( 'invisible' );
            }

            modalQueue.push( obj );
        },

        /**
         *
         * @param modal
         */
        modalWasClosed: function( modal ) {
            for( var i = 0, length = modalQueue.length; i < length; i++ ) {
                if( modalQueue[ i ].modal == modal ) {
                    // Если последний
                    if( i == length - 1 && i != 0 ) {
                        var previous = modalQueue[ i - 1 ];

                        previous.modal.removeClass( 'invisible' );
                        previous.background.removeClass( 'invisible' );
                        notifyLayoutChange();
                    }

                    modalQueue.splice( i, 1 );
                    break;
                }
            }
        }
    };

    function notifyLayoutChange() {
        var exchange = InfinniUI.global.messageBus;
        exchange.send( 'OnChangeLayout', {} );
    }

} )();
