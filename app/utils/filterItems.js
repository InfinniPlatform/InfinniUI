var filterItems = function(items, filter) {

	if( !filter ){
		return items;
	}

	var fu,
			filtersObj = {},
			result = JSON.parse(JSON.stringify(items));

	filter = filter.replace(/([a-zA-Z_][A-Za-z0-9_\.]*)\s*[,)$]/g, function(a, b){
		var last = a[a.length - 1];
		if(last != ',' && last != ')'){
			last = '';
		}
		return '"' + b + '"' + last;
	});

	filter = filter.replace(/([a-zA-z]*[(])/g, function(a, b) {
		return 'filtersObj.' + b;
	});

	filtersObj.eq = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] === value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};

	filtersObj.and = function() {
		return _.intersection.apply(_, arguments);
	};
	
	filtersObj.or = function() {
		return _.union.apply(_, arguments);
	};
	
	filtersObj.not = function(items) {
		var tmpResult = result.slice();	
		return _.difference(tmpResult, items);
	};
	
	filtersObj.notEq = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] !== value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};
	
	filtersObj.gt = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] > value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};
	
	filtersObj.gte = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] >= value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};
	
	filtersObj.lt = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] < value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};
	
	filtersObj.lte = function(param, value) {
		var tmpResult = [];
		for( var i = 0, ii = result.length; i < ii; i += 1 ) {
			if( result[i][param] <= value ) {
				tmpResult.push( result[i] );
			}
		}
		return tmpResult;
	};
	
	fu = new Function(
		'resultItems',
		'filtersObj',

		'return '  + filter + ';');

	return fu(result, filtersObj);

};