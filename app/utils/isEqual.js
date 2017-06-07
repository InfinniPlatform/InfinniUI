( function() {
    var isEqual = _.isEqual;

    /**
     *
     * @param a
     * @param b
     * @returns {boolean}
     */
    _.isEqual = function( a, b ) {
        if( typeof File !== 'undefined' ) {
            if( a instanceof File || b instanceof File ) {
                return a === b;
            }
        }
        return isEqual( a, b );
    };

} )();
