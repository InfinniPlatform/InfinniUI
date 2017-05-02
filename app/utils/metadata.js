InfinniUI.Metadata = InfinniUI.Metadata || {};

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

InfinniUI.Metadata.isBindingMetadata = function( metadata ) {
    return $.isPlainObject( metadata ) && 'Source' in metadata;
};
