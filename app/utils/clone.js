_.mixin( {

    deepClone: function( value ) {
        if( value !== null && typeof value !== 'undefined' ) {
            return JSON.parse( JSON.stringify( value ) );
        }
        return value;
    }

} );
