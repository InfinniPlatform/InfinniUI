_.mixin( {

    /**
     *
     * @param value
     * @returns {*}
     */
    deepClone: function( value ) {
        if( value !== null && typeof value !== 'undefined' ) {
            return JSON.parse( JSON.stringify( value ) );
        }
        return value;
    },

    recursiveDeepCopy: function recursiveDeepCopy( objForCopy ) {
        var newObj;

        if( typeof objForCopy !== 'object' ) {
            return objForCopy;
        }

        if( !objForCopy ) {
            return objForCopy;
        }

        if( Array.isArray( objForCopy ) ) {
            newObj = [];

            for( var i = 0; i < objForCopy.length; i += 1 ) {
                newObj[ i ] = recursiveDeepCopy( objForCopy[ i ] );
            }

            return newObj;
        }

        newObj = {};

        for( var key in objForCopy ) {
            if( objForCopy.hasOwnProperty( key ) ) {
                newObj[ key ] = recursiveDeepCopy( objForCopy[ key ] );
            }
        }

        return newObj;
    }

} );
