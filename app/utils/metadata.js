InfinniUI.Metadata = InfinniUI.Metadata || {};

/**
 *
 * @param value
 * @param metadata
 * @returns {boolean}
 */
InfinniUI.Metadata.isValidValue = function( value, metadata ) {
    var result = false;

    for ( var i in metadata ) {
        if ( metadata[ i ] === value ) {
            result = true;
            break;
        }
    }

    return result;
};

/**
 *
 * @param metadata
 * @returns {*|boolean}
 */
InfinniUI.Metadata.isBindingMetadata = function( metadata ) {
    return $.isPlainObject( metadata ) && 'Source' in metadata;
};
