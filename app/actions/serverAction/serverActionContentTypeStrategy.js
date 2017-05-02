/**
 *
 * @mixin
 */
var serverActionContentTypeStrategy = {

    'File': {
        /**
         *
         * @param provider
         * @param params
         * @param callback
         * @param onSuccess
         * @param onError
         */
        run: function( provider, params, callback, onSuccess, onError ) {
            provider.download( params, callback, onSuccess, onError );
        }
    },
    'Object': {
        /**
         *
         * @param provider
         * @param params
         * @param callback
         * @param onSuccess
         * @param onError
         */
        run: function( provider, params, callback, onSuccess, onError ) {
            provider.request( params, callback, onSuccess, onError );
        }
    }

};

InfinniUI.serverActionContentTypeStrategy = serverActionContentTypeStrategy;
