var filterItems = (function() {
	

	return function(items, filter) {
		if( !filter ){
			return items;
		}
		//all filter methods pick up from filterItems extention
		var filterMethods = filterItems.filterMethods;
		
		var itemsForFilter = JSON.parse(JSON.stringify(items)),
				re = /[a-zA-Z]+[(]|[a-zA-Z0-9_\.]+[,)$]|\[[0-9,]+\]/g,
				re2 = /[)]/g,
				one,
				two,
				arr = [],
				tmpArr = [], 
				filterTree = [],
				values = [],
				counter = 0;

		while( one = re.exec(filter) ) { // search all functions and values with their index
			// value can has only ',' or ')' at the end of string
			if( one[0].length > 1 && (one[0].slice(-1) === ',' || one[0].slice(-1) === ')')  ) { 
				one[0] = one[0].slice(0, -1);
			}
			arr.push(one);
		}
		while( two = re2.exec(filter) ) { // search all closing brackets with their index
			arr.push(two);
		}

		arr.sort(function(a, b) { // sort arr by indexes to put all data in right order
			return a.index - b.index;
		});

		// split all data to different functions
		for( var i = 0, ii = arr.length; i < ii; i += 1 ) {
			var tmpSymbol = arr[i][0].slice(-1);
			if( tmpSymbol === '(' ) { // define functions from string
				var that = {};	
				that.type = 'function';
				that.functionName = arr[i][0].slice(0, -1);
				that.index = arr[i].index;
				tmpArr.push( that );
			} else if( tmpSymbol === ')' ) { // define where end of function
				filterTree[counter] = [];
				var min = tmpArr.pop();
				min.range = [];
				min.range.push( min.index );
				min.children = [];
				min.range.push( arr[i].index );
				filterTree[counter] = min;
				counter += 1;
			} else { // define params that are values
				var thatValue = {};
				thatValue.type = 'value';
				thatValue.valueName = arr[i][0];
				thatValue.index = arr[i].index;
				values.push( thatValue );
			}
		}

		// remove all elements from arr
		arr.splice(0, arr.length);

		//add values to right place as children for functions 
		//define right place by range of index property
		for( var a = 0, aa = values.length; a < aa; a += 1 ) {
			for( var b = 0, bb = filterTree.length; b < bb; b += 1 ) {
				if( values[a] !== null ) {
					if( values[a].index > filterTree[b].range[0] && values[a].index < filterTree[b].range[1] ) {
						filterTree[b].children.push( values[a] );
						values[a] = null;
					}
				}
			}
		}

		// build up a filter tree
		// by putting some functions as children for other
		for( var k = 0; k < filterTree.length; k += 1 ) {
			for( var l = 0; l < filterTree.length; l += 1 ) {
				if( filterTree[l] !== null || filterTree[k] !== null ) {
					if( filterTree[k].range[0] > filterTree[l].range[0] && filterTree[k].range[1] < filterTree[l].range[1] ) {
						if( filterTree[l].children[0] !== undefined && filterTree[l].children[0].range[0] > filterTree[k].range[0] ) {
							filterTree[l].children.unshift( filterTree[k] );
							filterTree.splice(k, 1);
							k -= 1;
							break;
						} else {
							filterTree[l].children.push( filterTree[k] );
							filterTree.splice(k, 1);
							k -= 1;
							break;
						}
					}
				}
			}
		}

		function toNum(value) {
			if( !isNaN(value) ) {
				value = +value;
			}
			return value;
		}

		function toArr(value) {
			if( typeof value === 'string' && value.search(/\[[0-9,]+\]/) !== -1 ) {
				value = value.slice(1, -1).split(',');
				for( var i = 0, ii = value.length; i < ii; i += 1 ) {
					value[i] = toNum( value[i] );
				}
			}
			return value;
		}
		
		function filterExec(filterTree, items) { // filterTree is array, items is array
			var tmpChild = [], tmpChild1, tmpChild2 = [];
			if( filterTree.length !== undefined && filterTree.length > 0 ) {
				for( var i = 0, ii = filterTree.length; i < ii; i += 1 ) {
					if( ii > 1 ) {
						tmpChild.push( filterExec(filterTree[i], items) ); // filterTree is object
					} else if( ii === 1 ) {
						return filterExec(filterTree[i], items); // filterTree is object
					}
				}
				return tmpChild;
			}
			for( var j = 0, jj = filterTree.children.length; j < jj; j += 1 ) {
				if( filterTree.children[j].type === 'function' ) {
					tmpChild1 = filterTree.children[j];
					filterTree.children[j].valueName = filterExec(tmpChild1, items); // tmpChild1 is object
					filterTree.children[j].newType = 'value';
				}
				if( filterTree.children[j].type === 'value' || filterTree.children[j].newType === 'value' ) {
					if( filterTree.children[j].type === 'value' ) {
						filterTree.children[j].valueName = toNum( filterTree.children[j].valueName ); // check on Number
						filterTree.children[j].valueName = toArr( filterTree.children[j].valueName ); // check on Array
					}
					tmpChild2.push( filterTree.children[j].valueName );
				}
			}
			return filterMethods[filterTree.functionName](tmpChild2, items); // tmpChild2 is array
		}

		return filterExec(filterTree, itemsForFilter); // filterTree is array, items is array
	};
})(filterItems);


//sub method for filterItems with filter methods
filterItems.filterMethods = (function() {
	var that = {};

	that.eq = function(value, items) { // values is array
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] === value[1] ) {
				tmpResult.push( items[i] );
			}
		}		
		return tmpResult;
	};

	that.and = function(values) {
		return _.intersection.apply(_, values);
	};
	
	that.or = function(values) {
		return _.union.apply(_, values);
	};
	
	that.not = function(values, items) { // values[1] is array
		var tmpResult = items.slice();	
		return _.difference(tmpResult, values[0]);
	};
	
	that.notEq = function(value, items) {
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] !== value[1] ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};
	
	that.gt = function(value, items) { // compare for numbers and dates
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] > value[1] ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};
	
	that.gte = function(value, items) { // compare for numbers and dates
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] >= value[1] ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};
	
	that.lt = function(value, items) { // compare for numbers and dates
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] < value[1] ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};
	
	that.lte = function(value, items) { // compare for numbers and dates
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( items[i][value[0]] <= value[1] ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};

	that.in = function(values, items) { // values[1] is array
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( _.indexOf(values[1], items[i][values[0]]) !== -1 ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};

	that.notIn = function(values, items) { // values[1] is array
		var tmpResult = [];
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			if( _.indexOf(values[1], items[i][values[0]]) === -1 ) {
				tmpResult.push( items[i] );
			}
		}
		return tmpResult;
	};

	that.exist = function(value, items) { // value[1] is string
		var tmpResult = [],
				tmpValue;
		if( value[1] === undefined ) {
			value[1] = 'true';
		}
		for( var i = 0, ii = items.length; i < ii; i += 1 ) {
			tmpValue = items[i][value[0]];
			if( value[1] === 'true' ) {
				if( !_.isUndefined(tmpValue) && !_.isNull(tmpValue) ) {
					tmpResult.push( items[i] );
				}
			} else {
				if( _.isUndefined(tmpValue) || _.isNull(tmpValue) ) {
					tmpResult.push( items[i] );
				}
			}
		}
		return tmpResult;
	};

	that.match = function(arrProp, expression) {
		var tmpResult = [];

		return tmpResult;
	};

	that.all = function(arrProp, values) {
		var tmpResult = [];

		return tmpResult;
	};

	that.anyIn = function(arrProp, values) {
		var tmpResult = [];

		return tmpResult;
	};

	that.anyNotIn = function(arrProp, values) {
		var tmpResult = [];

		return tmpResult;
	};

	that.anyEq = function(arrProp, value) {
		var tmpResult = [];

		return tmpResult;
	};

	that.anyNotEq = function(arrProp, value) {
		var tmpResult = [];

		return tmpResult;
	};

	return that;
})();



// var resultOfFiltering = handleFunction(tree, {items: []});

// function handleFunction(node, context){
// 	return filtersObj[node.functionName](node, context);
// }

// function handleValue(value, context){
	
// }

// filtersObj.match = function(node, context){
// 	var newContext = {
// 		items: context.items,
// 		outerProperty: node.children[0].valueName
// 	},
// 	functionName = node.children[1].functionName;

// 	return filtersObj[functionName](node, newContext);
// }


// filter = filter.replace(/([a-zA-Z_][A-Za-z0-9_\.]*)\s*[,)$]/g, function(a, b){
		// 	var last = a[a.length - 1];
		// 	if(last != ',' && last != ')'){
		// 		last = '';
		// 	}
		// 	return '"' + b + '"' + last;
		// });

		// add 'filtersObj.' to all functions in filter string for creation one obj with all methods
		// filter = filter.replace(/([a-zA-z]*[(])/g, function(a, b) {
		// 	return 'filterMethods.' + b;
		// });

		// filterTree = {
		// 	type: 'function',
		// 	functionName: 'match',

		// 	children: [
		// 		{
		// 			type: 'value',
		// 			valueName: 'addresses'
		// 		}, 
		// 		{
		// 			type: 'function',
		// 			functionName: 'eq',
		// 			children: [
		// 					{
		// 						type: 'value',
		// 						valueName: 'street'
		// 					},
		// 					{
		// 						type: 'value',
		// 						valueName: 'Ленина'
		// 					}
		// 			]
		// 		}
		// 	]
		// };

		// 'match(addresses,eq(street,Lenina))'.match(/[a-zA-Z_][A-Za-z0-9_\.]*\s*[,)$]|[a-zA-Z]+[(]/g)
		// 'and(eq(Id,1),eq(Id,2))'.slice(3).search(/[a-zA-Z]+[(]/)