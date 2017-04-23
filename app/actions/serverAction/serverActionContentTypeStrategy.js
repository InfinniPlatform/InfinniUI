var serverActionContentTypeStrategy = {

    'File': {
        run: function( provider, params, callback, onSuccess, onError ) {
            provider.download( params, callback, onSuccess, onError );
        }
    },
    'Object': {
        run: function( provider, params, callback, onSuccess, onError ) {
            provider.request( params, callback, onSuccess, onError );
        }
    }

};

InfinniUI.serverActionContentTypeStrategy = serverActionContentTypeStrategy;
