var routerService = (function(myRoutes) {
	if( !myRoutes ) {
		return null;
	}

	var parseRouteForBackbone = function(myRoutes) {
		var routerObj = {};
		routerObj.routes = {};
		for( var i = 0, ii = myRoutes.length; i < ii; i += 1 ) {
			myRoutes[i].originalPath = myRoutes[i].Path;
			if( myRoutes[i].Path.search('<%') !== -1 ) {
				var tmpArr,
						tmpParam,
						re = /\<\%[\sa-zA-Z0-9]+\%\>/g;
				while( tmpArr = re.exec(myRoutes[i].Path) ) {
					tmpParam = tmpArr[0].replace(/\s+/g, '').slice(2, -2);
					myRoutes[i].Path = myRoutes[i].Path.slice(0, tmpArr.index) + ':' + tmpParam + myRoutes[i].Path.slice(tmpArr.index + tmpArr[0].length);
					re.lastIndex = tmpArr.index + tmpParam.length;
				}
			}
			routerObj.routes[myRoutes[i].Path.slice(1)] = myRoutes[i].Name; // remove first slash from myRoutes[i].Path for backbone
			routerObj[myRoutes[i].Name] = myFunc(myRoutes[i].Name, myRoutes[i].Action);
		}
		return routerObj;
	};

	var getLinkByName = function(name, originalPath) {
		var original = originalPath || 'yes';
		for( var i = 0, ii = myRoutes.length; i < ii; i += 1 )  {
			if( myRoutes[i].Name === name ) {
				if( original === 'yes' ) {
					return myRoutes[i].originalPath;
				} else {
					return myRoutes[i].Path;
				}
			}
		}
	};

	var myFunc = function(name, callback) {
		return function() {
			var params = Array.prototype.slice.call(arguments);
			new ScriptExecutor({getContext: function() {return 'No context';}}).executeScript(callback, { name: name, params: params });
		};
	};

	var routerObj = parseRouteForBackbone(myRoutes);

	var startRouter = function() {
		var Router = Backbone.Router.extend(routerObj);
		InfinniUI.AppRouter = new Router();

		Backbone.history = Backbone.history || new Backbone.History({});
		Backbone.history.start(InfinniUI.config.HistoryAPI);
	};

	return {
		getLinkByName: getLinkByName,
		startRouter: startRouter
	};
})(InfinniUI.config.Routes);

window.InfinniUI.RouterService = routerService;
