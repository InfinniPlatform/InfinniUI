var FakeDocumentDataProvider = function(){
	_.superClass(FakeDocumentDataProvider, this);
};

_.inherit(FakeDocumentDataProvider, InfinniUI.Providers.RestDataProvider);

_.extend( FakeDocumentDataProvider.prototype, {

	items: [],
	lastSendedUrl: '',

	send: function(type, successHandler, errorHandler){
		var requestId = Math.round( (Math.random() * 100000) );
		var params = this.requestParams[type];
		var that = this;
		var filter;


		var urlString = params.origin + params.path;
		var queryString;

		if( type == 'get' && _.size(params.data) > 0 ){
			queryString = this.joinDataForQuery(params.data);
			urlString = urlString + '?' + queryString;
		}

		FakeDocumentDataProvider.prototype.lastSendedUrl = urlString;

		filter = this.splitUrl(urlString).query.filter;

		setTimeout(function(){
			successHandler({
				requestId: requestId,
				data: that.InfinniUI.FilterItems( that.items, filter )
			});
		}, 1);

		return requestId;
	},

	splitUrl: function(url){
		var result = {
				origin: '',
				paths: [],
				query: {}
			},
			tmpPaths,
			tmpPathsLength,
			tmpQuery,
			tmpQueryItem;

		tmpPaths = url.split('/');

		result.origin = tmpPaths[0];
		tmpPaths.splice(0, 1);

		tmpPathsLength = tmpPaths.length;

		if( tmpPathsLength > 0 ){
			tmpQuery = tmpPaths[tmpPathsLength - 1].split('?');
			if(tmpQuery.length > 1){
				tmpPaths[tmpPathsLength - 1] = tmpQuery[0];
				tmpQuery = tmpQuery[1].split('&');

				for( var i = 0, ii = tmpQuery.length; i < ii; i++ ){
					tmpQueryItem = tmpQuery[i].split('=');
					result.query[tmpQueryItem[0]] = tmpQueryItem[1];
				}
			}
		}

		return result;
	},

	filterItems: function(items, filter){

		if(!filter){
			return items;
		}

		var fu;
		var result = JSON.parse(JSON.stringify(items));

		filter = filter.replace(/([a-zA-Z_][A-Za-z0-9_\.]*)\s*[,)$]/g, function(a,b){
			var last = a[a.length - 1];
			if(last != ',' && last != ')'){
				last = '';
			}
			return '"' + b + '"' + last;
		});

		fu = new Function('resultItems', 'eq', 'and', 'return ' + filter + ';');

		return fu(result, eq, and);


		function eq(param, value){
			var tmpResult = [];
			for(var i = 0, ii = result.length; i<ii; i++){
				if(result[i][param] == value){
					tmpResult.push(result[i]);
				}
			}

			return tmpResult;
		}

		function and(list1, list2){
			return _.intersection(list1, list2);
		}

		function or(list1, list2){
			return _.union(list1, list2);
		}
	}

});
