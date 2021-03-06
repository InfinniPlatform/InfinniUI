/**
 *
 * @type {{getParams: urlManager.getParams, clearUrlSearchPath: urlManager.clearUrlSearchPath, setParameter: urlManager.setParameter, deleteParameter: urlManager.deleteParameter}}
 */
var urlManager = {

    /**
     *
     * @returns {*}
     */
    getParams: function() {
        var getPath = location.search;
        var result = {};
        var params, tmpParam;

        if( getPath.length == 0 ) {
            return result;
        }

        getPath = getPath.substr( 1 );
        params = getPath.split( '&' );

        for( var i = 0, ii = params.length; i < ii; i++ ) {
            tmpParam = params[ i ].split( '=' );
            result[ tmpParam[ 0 ] ] = tmpParam[ 1 ];
        }

        return result;
    },

    /**
     *
     */
    clearUrlSearchPath: function() {
        var searchPath = location.search;
        var index, newUrl;

        if( searchPath.length > 0 ) {
            index = location.href.indexOf( searchPath );
            if( index > 0 ) {
                newUrl = location.href.substr( 0, index );
            }
        }

        if( newUrl ) {
            history.pushState( null, null, newUrl );
        }
    },

    /**
     *
     * @param name
     * @param value
     */
    setParameter: function( name, value ) {
        var oldSearch = location.search;
        var newSearch = _.isEmpty( oldSearch ) ?
            stringUtils.format( '?{0}={1}', [ name, value ] ) :
            stringUtils.format( '{0}&{1}={2}', [ oldSearch, name, value ] );
        var newUrl = stringUtils.format( '{0}//{1}{2}{3}{4}', [ location.protocol, location.host, location.pathname, newSearch, location.hash ] );

        history.pushState( null, null, newUrl );
    },

    /**
     *
     * @param name
     */
    deleteParameter: function( name ) {
        var params = urlManager.getParams();
        delete params[ name ];

        var newSearch = generateSearch( params );
        var newUrl = stringUtils.format( '{0}//{1}{2}{3}{4}', [ location.protocol, location.host, location.pathname, newSearch, location.hash ] );
        history.pushState( null, null, newUrl );

        /**
         *
         * @param params
         * @returns {string}
         */
        function generateSearch( params ) {
            var paramsArray = [];
            _.mapObject( params, function( val, key ) {
                var param = stringUtils.format( '{0}={1}', [ key, val ] );
                paramsArray.push( param );
            } );

            return _.isEmpty( paramsArray ) ?
                '' :
            '?' + paramsArray.join( '&' );
        }
    }

};

InfinniUI.urlManager = urlManager;
