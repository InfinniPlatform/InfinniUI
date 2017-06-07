/**
 *
 * @param host
 * @param metadata
 * @constructor
 */
function QueryConstructorMetadata( host, metadata ) {

    /**
     *
     * @returns {{requestUrl: string, method: string}}
     */
    this.constructMetadataRequest = function() {
        return {
            'requestUrl': host + '/' + metadata.Path,
            'method': 'GET'
        };
    };

}

InfinniUI.Providers.QueryConstructorMetadata = QueryConstructorMetadata;
