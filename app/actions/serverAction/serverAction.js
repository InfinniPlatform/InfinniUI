/**
 *
 * @param parentView
 * @constructor
 */
function ServerAction( parentView ) {
    _.superClass( ServerAction, this, parentView );
    this.provider = InfinniUI.providerRegister.build( 'ServerActionProvider' );
    this.updateContentTypeStrategy();
    this.on( 'change:contentType', this.updateContentTypeStrategy );
}

_.inherit( ServerAction, BaseAction );

_.extend( ServerAction.prototype, baseFallibleActionMixin, {

    defaults: {
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        method: 'GET',
        data: {}
    },

    /**
     *
     */
    updateContentTypeStrategy: function() {
        var contentType = this.getProperty( 'contentType' );

        if( typeof contentType === 'string' && contentType.includes( 'multipart' ) ) {
            this.contentTypeStrategy = serverActionContentTypeStrategy[ 'File' ];
        } else {
            this.contentTypeStrategy = serverActionContentTypeStrategy[ 'Object' ];
        }
    },

    /**
     *
     * @param callback
     */
    execute: function( callback ) {
        var that = this;
        var onExecuted = function( args ) {
            that.onExecutedHandler( args );

            if( typeof callback === 'function' ) {
                callback( args );
            }
        };
        var onSuccess = function( args ) {
            that.onSuccessHandler( args );
        };
        var onError = function( args ) {
            that.onErrorHandler( args );
        };

        this.contentTypeStrategy.run( this.provider, this._getRequestData(), onExecuted, onSuccess, onError );
    },

    /**
     *
     * @param name
     * @param value
     */
    setParam: function( name, value ) {
        this.setProperty( 'params.' + name, value );
    },

    /**
     *
     * @param name
     * @returns {*}
     */
    getParam: function( name ) {
        return this.getProperty( 'params.' + name );
    },

    /**
     *
     * @returns {object}
     * @private
     */
    _getRequestData: function() {
        var origin = this._replaceParamsInStr( this.getProperty( 'origin' ) );
        var path = this._replaceParamsInStr( this.getProperty( 'path' ) );
        var method = this.getProperty( 'method' ).toUpperCase();
        var contentType = this.getProperty( 'contentType' );
        var data = this._replaceParamsInObject( this.getProperty( 'data' ) );
        var result = {};

        result.requestUrl = origin + path;
        result.method = method;
        result.contentType = contentType;

        if( !_.isEmpty( data ) ) {
            if( method == 'GET' ) {
                result.requestUrl = result.requestUrl + '?' + stringUtils.joinDataForQuery( data );
            } else {
                result.args = ( typeof contentType === 'string' && contentType.includes( 'application/json' ) ) ? JSON.stringify( data ) : data;
            }
        }

        return result;
    },

    /**
     *
     * @param str
     * @param escape
     * @returns {*}
     * @private
     */
    _replaceParamsInStr: function( str, escape ) {
        if( !str || typeof str !== 'string' ) {
            return str;
        }

        var that = this;
        var matched = str.match( /^<%([\s\S]+?)%>$/ );

        if( matched ) {
            return this.getParam( matched[ 1 ] );
        }

        return str.replace( /<%([\s\S]+?)%>/g, function( p1, p2 ) {
            var val = that.getParam( p2 );

            if( escape && typeof val === 'string' ) {
                val = val.replace( /"/g, '\\"' );
            }
            return val;
        } );
    },

    /**
     *
     * @param data
     * @returns {*}
     * @private
     */
    _compileData: function( data ) {
        var res;

        if( Array.isArray( data ) ) {
            res = Array.map( function( item ) {
                if( typeof item === 'object' || Array.isArray( item ) ) {
                    this._compileData( item );
                }
            }, this );
        } else if( typeof data === 'object' ) {
            res = {};

            for( var key in Object.keys( data ) ) {
                var name = Object.keys( data )[ key ];
                var parsedName = this._replaceParamsInStr( name );

                res[ parsedName ] = this._compileData( data[ name ] );
            }
        } else {
            res = this._replaceParamsInStr( data, true );
        }

        return res;
    },

    /**
     *
     * @param obj
     * @returns {*}
     * @private
     */
    _replaceParamsInObject: function( obj ) {
        if( _.isEmpty( obj ) ) {
            return obj;
        }

        return this._compileData( obj );
    }

} );

InfinniUI.ServerAction = ServerAction;
