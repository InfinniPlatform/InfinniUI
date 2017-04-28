var routerService = ( function( myRoutes ) {
    if( !myRoutes ) {
        return null;
    }

    var parseRouteForBackbone = function( myRoutes ) {
        var routerObj = {};
        routerObj.routes = {};

        for( var i = 0, ii = myRoutes.length; i < ii; i += 1 ) {
            myRoutes[ i ].originalPath = myRoutes[ i ].Path;
            if( myRoutes[ i ].Path.search( '<%' ) !== -1 ) {
                var tmpArr,
                    tmpParam,
                    re = /\<\%[\sa-zA-Z0-9]+\%\>/g;
                while( tmpArr = re.exec( myRoutes[ i ].Path ) ) {
                    tmpParam = tmpArr[ 0 ].replace( /\s+/g, '' ).slice( 2, -2 );
                    myRoutes[ i ].Path = myRoutes[ i ].Path.slice( 0, tmpArr.index ) + ':' + tmpParam + myRoutes[ i ].Path.slice( tmpArr.index + tmpArr[ 0 ].length );
                    re.lastIndex = tmpArr.index + tmpParam.length;
                }
            }
            routerObj.routes[ myRoutes[ i ].Path.slice( 1 ) ] = myRoutes[ i ].Name; // remove first slash from myRoutes[i].Path for backbone
            routerObj[ myRoutes[ i ].Name ] = onRouteSelectHandler( myRoutes[ i ].Name, myRoutes[ i ].Action );
        }

        return routerObj;
    };

    var getLinkByName = function( name, originalPath ) {
        var original = originalPath || 'yes';

        for( var i = 0, ii = myRoutes.length; i < ii; i += 1 ) {
            if( myRoutes[ i ].Name === name ) {
                if( original === 'yes' ) {
                    return myRoutes[ i ].originalPath;
                } else {
                    return myRoutes[ i ].Path;
                }
            }
        }
    };

    var onRouteSelectHandler = function( name, script ) {
        return function() {
            var params = {
                name: name,
                params: Array.prototype.slice.call( arguments ),
                routeParams: routerService._params
            };

            new ScriptExecutor( {
                getContext: function() {
                    return routerService._context || 'No context';
                }
            } ).executeScript( script, params );
        };
    };

    var routerObj = parseRouteForBackbone( myRoutes );


    var startRouter = function() {
        if( !InfinniUI.AppRouter ) {
            var Router = Backbone.Router.extend( routerObj );
            InfinniUI.AppRouter = new Router();

            Backbone.history = Backbone.history || new Backbone.History( {} );
            Backbone.history.start( InfinniUI.config.HistoryAPI );
        } else {
            console.log( 'Попытка повторно запустить routerService' );
        }
    };

    var setContext = function( context ) {
        this._context = context;
    };

    var setParams = function( params ) {
        this._params = params;
    };

    var addParams = function( params ) {
        this._params = _.extend( this._params || {}, params );
    };

    var routerService = {
        getLinkByName: getLinkByName,
        startRouter: startRouter,
        setContext: setContext,
        setParams: setParams,
        addParams: addParams
    };

    return routerService;
} )( InfinniUI.config.Routes );

InfinniUI.RouterService = routerService;
