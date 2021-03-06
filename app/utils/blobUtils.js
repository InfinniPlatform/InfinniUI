/**
 * Набор утилит для работы с BlobData объектами
 **/
InfinniUI.BlobUtils = ( function() {
    var blobUtils = {
        isFileInfo: isFileInfo,
        getContentId: getContentByName.bind( null, 'Id' ),
        getName: getContentByName.bind( null, 'Name' ),
        getSize: getContentByName.bind( null, 'Size' ),
        getTime: getContentByName.bind( null, 'Time' ),
        getType: getContentByName.bind( null, 'Type' )
    };

    return blobUtils;

    /**
     *
     * @param data
     * @returns {*}
     */
    function isFileInfo( data ) {
        return data && blobUtils.getContentId( data );
    }

    /**
     *
     * @param name
     * @param data
     * @param defaultValue
     * @returns {*}
     */
    function getContentByName( name, data, defaultValue ) {
        return typeof data === 'object' ? data[ name ] : defaultValue;
    }
} )();
