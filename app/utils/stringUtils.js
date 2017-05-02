if ( !String.prototype.includes ) {
    String.prototype.includes = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

var stringUtils = {

    format: function( value, args ) {
        return value.replace( /{(\d+)}/g, function( match, number ) {
            return typeof args[ number ] !== 'undefined'
                ? args[ number ]
                : match
                ;
        } );
    },

    formatProperty: function( property, indexes ) {
        if( !indexes || indexes.length == 0 || property == '' ) {
            return property;
        }

        var propertyPaths = property.split( '.' );

        var j = indexes.length - 1;

        for( var i = propertyPaths.length - 1; i >= 0; i-- ) {
            if( propertyPaths[ i ] == '#' && j >= 0 ) {
                propertyPaths[ i ] = indexes[ j ];
                j--;
            }else if( propertyPaths[ i ] == '$' || stringUtils.isNumeric( propertyPaths[ i ] ) ) {
                j--;
            }
        }

        return propertyPaths.join( '.' );
    },

    padLeft: function a( value, len, char ) {
        if ( typeof char === 'undefined' || char === null ) {
            char = ' ';
        }

        var str = String( value );

        if ( str.length < len ) {
            return new Array( len - str.length + 1 ).join( char ) + str;
        }
        return str;
    },

    isNumeric: function( n ) {
        return !isNaN( parseFloat( n ) ) && isFinite( n );
    },

    replaced: {
        '+': '%2B'
    },

    joinDataForQuery: function( data ) {
        var result = [];
        var that = this;

        for( var k in data ) {
            var p = _.isString( data[ k ] ) ? data[ k ].replace( /[\+]/g, function( c ) {
                return that.replaced[ c ] || c;
            } ) : data[ k ];

            result.push( k + '=' + p );
        }

        return result.join( '&' );
    }
};

InfinniUI.stringUtils = stringUtils;
InfinniUI.guid = guid;

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString( 16 );
    } );
}
