var routerServiceMixin = {

	replaceParamsInHref: function(oldHref, param, newValue, hrefPattern) {
		if( hrefPattern ) {
			var newHref = hrefPattern.split('?')[0],
					query = hrefPattern.split('?')[1],
					tmpArr = newHref.split('/'),
					index = tmpArr.indexOf(':' + param);

			if( index === -1 ) {
				throw new Error('Different param names in metadata and InfinniUI.config.Routes');
			}
			tmpArr = oldHref.split('/');
			tmpArr[index] = newValue;
			tmpArr = tmpArr.join('/');
			if( query ) {
				tmpArr += '?' + query;
			}
			return tmpArr;
		} else {
			return oldHref.replace(':' + param, newValue);
		}
	},

	replaceParamsInQuery: function(oldHref, queryParam, newValue, queryPattern) {
		if( queryPattern ) {
			var newHref = oldHref.split('?')[0],
					query = oldHref.split('?')[1],
					queryTmp = queryPattern.split('?')[1],
					tmpArr = queryTmp.split('&'),
					index = -1;

			for(var i = 0, ii = tmpArr.length; i < ii; i += 1) {
				if( tmpArr[i].indexOf(':' + queryParam) !== -1 ) {
					index = i;
				}
			}

			if( index === -1 ) {
				throw new Error('Different query names in metadata and InfinniUI.config.Routes');
			}
			tmpArr = query.split('&');
			var tmpValue =  tmpArr[index].split('=');
			tmpValue[1] = newValue;
			tmpArr[index] = tmpValue.join('=');
			var finalString = newHref + '?' + tmpArr.join('&');
			return finalString;
		} else {
			return oldHref.replace(':' + queryParam, newValue);
		}
	},

	bindParams: function(params, paramName, paramValue, hrefPattern) {
		var element = params.element,
				builder = params.builder,
				that = this,
				args = {
					parent: params.parent,
					parentView: params.parentView,
					basePathOfProperty: params.basePathOfProperty
				};

			var dataBinding = params.builder.buildBinding(paramValue, args);

			dataBinding.bindElement({
				onPropertyChanged: function() {},
				setProperty: function(elementProperty, newValue) {
					var oldHref = element.getHref(),
							newHref = that.replaceParamsInHref(oldHref, paramName, newValue, hrefPattern);
					element.setHref(newHref);
				},
				getProperty: function() {}
			}, '');
	},

	bindQuery: function(params, queryName, queryValue, queryPattern) {
		var element = params.element,
				builder = params.builder,
				that = this,
				args = {
					parent: params.parent,
					parentView: params.parentView,
					basePathOfProperty: params.basePathOfProperty
				};

			var dataBinding = params.builder.buildBinding(queryValue, args);

			dataBinding.bindElement({
				onPropertyChanged: function() {},
				setProperty: function(elementProperty, newValue) {
					var oldHref = element.getHref(),
							newHref = that.replaceParamsInQuery(oldHref, queryName, newValue, queryPattern);
					element.setHref(newHref);
				},
				getProperty: function() {}
			}, '');
	}
};
