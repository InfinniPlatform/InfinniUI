var filterItems = (function() {

    return function( items, filter ) {
        if( !filter ) {
            return items;
        }

        var itemsForFilter = JSON.parse( JSON.stringify( items ) ),
            filterMethods = filterItems.filterMethods,
            filterTree = filterItems.filterTreeBuilder.buildUpFilterTree( filter );

        function stringToNum( value ) {
            if( typeof value === 'string' && !isNaN( value ) ) {
                value = +value;
            }
            return value;
        }

        function stringToNumAsString( value ) {
            if( typeof value === 'string' && value.slice( 0, 1 ) === "'" ) {
                value = value.slice( 1, -1 );
            }
            return value;
        }

        function stringToBoolean( value ) {
            if( value === 'true' ) {
                value = true;
            } else if( value === 'false' ) {
                value = false;
            } else if( value === 'null' ) {
                value = null;
            }
            return value;
        }

        function stringToArr( value ) {
            if( typeof value === 'string' && value.search( /\[[\'a-zA-Z0-9,]+\]/ ) !== -1 ) {
                value = value.slice( 1, -1 ).split( ',' );
                for( var i = 0, ii = value.length; i < ii; i += 1 ) {
                    if( value[i].slice( -1 ) === "'" ) {
                        value[i] = value[i].slice( 1, -1 );
                    }
                    value[i] = stringToBoolean( value[i] );
                    value[i] = stringToNum( value[i] );
                    value[i] = stringToNumAsString( value[i] );
                }
            }
            return value;
        }

        function findContext( currentContext, currentFunc ) {
            if( currentFunc.functionName === 'match' ) {
                currentContext = currentFunc.children[0].valueName;
            }
            return currentContext;
        }

        function filterExec( filterTree, items, context ) { // filterTree is object, items is array
            var tmpChild1, tmpChild2 = [];
            // find context
            context = findContext( context, filterTree );
            for( var j = 0, jj = filterTree.children.length; j < jj; j += 1 ) {
                // if any child is function
                // call filterExec with children of this child
                if( filterTree.children[j].type === 'function' ) {
                    tmpChild1 = filterTree.children[j];

                    filterTree.children[j].valueName = filterExec( tmpChild1, items, context );
                    filterTree.children[j].newType = 'value';
                }
                if( filterTree.children[j].type === 'value' || filterTree.children[j].newType === 'value' ) {
                    if( filterTree.children[j].type === 'value' ) {
                        filterTree.children[j].valueName = stringToNum( filterTree.children[j].valueName ); // check on Number
                        filterTree.children[j].valueName = stringToNumAsString( filterTree.children[j].valueName ); // check on Number as string
                        filterTree.children[j].valueName = stringToBoolean( filterTree.children[j].valueName ); // check on Boolean
                        filterTree.children[j].valueName = stringToArr( filterTree.children[j].valueName ); // check on Array
                    }
                    tmpChild2.push( filterTree.children[j].valueName );
                }
            }
            return filterMethods[filterTree.functionName]( tmpChild2, items, context ); // tmpChild2 is array
        }

        return filterExec( filterTree, itemsForFilter );
    };
})( filterItems );

window.InfinniUI.FilterItems = filterItems;

filterItems.filterTreeBuilder = (function() {
    var that = {},
        splitStringToArray = function( filter ) { //filter is string
            var tmpArr,
                tmpNum,
                tmpString,
                tmpString2,
                tmpRE,
                reForDates = /date\(\'[\d\wа-яёА-ЯЁ\:\-\+\.\s]+\'\)/g,
                reForParamAsArray = /\,[\d\wа-яёА-ЯЁ\'\,\_\.]+\)/g,
                reForArrayFromOneElem = /\[[\d\w\'\_\.]+\]/g,
                reForElemsOfTree = /[\w]+[(]|\[[\d\wа-яёА-ЯЁ\S]+\]|[-\']{0,1}[\d\wа-яёА-ЯЁ_\.]+[\']{0,1}[,)$]/g,
                reForClosingBrackets = /[)]/g,
                reForRegExp = /\'([\d\w\S\W\D]+\s*)+\'/g,
                reForSpaces = /\s+/g,
                reForFewWordsInQuotes = /\'([\d\wа-яёА-ЯЁ\s]+\s*)+\'/g,
                arr = [];
            while( tmpArr = reForDates.exec( filter ) ) { // search all dates and convert it to number of s [0.000]
                tmpNum = Date.parse( tmpArr[0].slice( 6, -2 ) ) / 1000 + '';
                filter = filter.slice( 0, tmpArr.index ) + tmpNum + filter.slice( tmpArr.index + tmpArr[0].length );
                reForDates.lastIndex = tmpArr.index + tmpNum.length;
            }
            while( tmpArr = reForRegExp.exec( filter ) ) { // search for regexp
                tmpNum = tmpArr[0];
                if( tmpNum.search( reForSpaces ) !== -1 || tmpNum.search( reForFewWordsInQuotes ) !== -1 ) {
                    while( tmpString = reForFewWordsInQuotes.exec( tmpNum ) ) {
                        tmpString2 = tmpString[0].replace( reForSpaces, '_' );
                        tmpNum = tmpNum.slice( 0, tmpString.index ) + tmpString2 + tmpNum.slice( tmpString.index + tmpString[0].length );
                    }
                } else {
                    tmpRE = tmpNum.slice( 1, -1 );
                    tmpNum = 'tmpRE';
                }
                filter = filter.slice( 0, tmpArr.index ) + tmpNum + filter.slice( tmpArr.index + tmpArr[0].length );
                reForRegExp.lastIndex = tmpArr.index + tmpNum.length;
            }
            filter = filter.replace( /\s+/g, '' );
            while( tmpArr = reForParamAsArray.exec( filter ) ) { // search second param
                tmpNum = '[' + tmpArr[0].slice( 1, -1 ) + '])';
                filter = filter.slice( 0, tmpArr.index + 1 ) + tmpNum + filter.slice( tmpArr.index + tmpArr[0].length );
                reForParamAsArray.lastIndex = tmpArr.index + tmpNum.length;
            }
            while( tmpArr = reForArrayFromOneElem.exec( filter ) ) { // convert array from 1 element to number or string or boolean
                tmpNum = tmpArr[0].slice( 1, -1 );
                filter = filter.slice( 0, tmpArr.index ) + tmpNum + filter.slice( tmpArr.index + tmpArr[0].length );
                reForArrayFromOneElem.lastIndex = tmpArr.index + tmpNum.length;
            }
            while( tmpArr = reForElemsOfTree.exec( filter ) ) { // search all functions and values with their index
                if( tmpArr[0].length > 1 && (tmpArr[0].slice( -1 ) === ',' || tmpArr[0].slice( -1 ) === ')') ) {
                    tmpArr[0] = tmpArr[0].slice( 0, -1 );
                }
                if( tmpArr[0].length > 1 && tmpArr[0].slice( 0, 1 ) === "'" ) {
                    if( isNaN( tmpArr[0].slice( 1, -1 ) ) ) {
                        tmpArr[0] = tmpArr[0].slice( 1, -1 );
                    }
                }
                if( tmpArr[0].search( /tmpRE/ ) !== -1 ) {
                    tmpArr[0] = tmpArr[0].slice( 1, -1 ).split( ',' );
                    tmpArr[0][0] = tmpRE;
                }
                arr.push( tmpArr );
            }
            while( tmpArr = reForClosingBrackets.exec( filter ) ) { // search all closing brackets with their index
                arr.push( tmpArr );
            }
            arr.sort( function( a, b ) { // sort arr by indexes to put all data in right order
                return a.index - b.index;
            } );
            return arr;
        },
        divideToFunctionsAndValues = function( arrayToDivide ) { //arrayToDivide is array
            var tmpArr = [],
                values = [],
                filterArr = [],
                counter = 0,
                that,
                tmpSymbol,
                thatValue,
                firstPart;
            // split all data to different functions
            for( var i = 0, ii = arrayToDivide.length; i < ii; i += 1 ) {
                if( typeof arrayToDivide[i][0] === 'string' ) {
                    tmpSymbol = arrayToDivide[i][0].slice( -1 );
                } else {
                    tmpSymbol = ']';
                }
                if( tmpSymbol === '(' ) { // define functions from string
                    that = {};
                    that.type = 'function';
                    that.functionName = arrayToDivide[i][0].slice( 0, -1 );
                    that.index = arrayToDivide[i].index;
                    tmpArr.push( that );
                } else if( tmpSymbol === ')' ) { // define where end of function
                    filterArr[counter] = [];
                    firstPart = tmpArr.pop();
                    firstPart.range = [];
                    firstPart.range.push( firstPart.index );
                    firstPart.children = [];
                    firstPart.range.push( arrayToDivide[i].index );
                    filterArr[counter] = firstPart;
                    counter += 1;
                } else { // define params that are values
                    thatValue = {};
                    thatValue.type = 'value';
                    thatValue.valueName = arrayToDivide[i][0];
                    thatValue.index = arrayToDivide[i].index;
                    values.push( thatValue );
                }
            }
            return [filterArr, values];
        },
        addValuesAsChildren = function( filterArr, values ) { // filterArr, values are arrays
            //add values to right place as children for functions
            //define right place by range of index property
            for( var i = 0, ii = values.length; i < ii; i += 1 ) {
                for( var j = 0, jj = filterArr.length; j < jj; j += 1 ) {
                    if( values[i] !== null ) {
                        if( values[i].index > filterArr[j].range[0] && values[i].index < filterArr[j].range[1] ) {
                            filterArr[j].children.push( values[i] );
                            values[i] = null;
                        }
                    }
                }
            }
            return filterArr;
        },
        filterArrToTree = function( filterArr ) { // filterArr is array
            // build up a filter tree
            // by putting some functions as children for other
            for( var i = 0; i < filterArr.length; i += 1 ) {
                for( var j = 0; j < filterArr.length; j += 1 ) {
                    if( filterArr[j] !== null || filterArr[i] !== null ) {
                        //search for first result[j] where we can put result[i] as his child
                        //if find, put it and remove result[i]
                        if( filterArr[i].range[0] > filterArr[j].range[0] && filterArr[i].range[1] < filterArr[j].range[1] ) {
                            //if result[j] already have any children, check their indexes to define where put new child
                            if( filterArr[j].children[0] !== undefined && filterArr[j].children[0].index > filterArr[i].range[0] ) {
                                filterArr[j].children.unshift( filterArr[i] );
                                filterArr.splice( i, 1 );
                                i -= 1;
                                break;
                            } else {
                                filterArr[j].children.push( filterArr[i] );
                                filterArr.splice( i, 1 );
                                i -= 1;
                                break;
                            }
                        }
                    }
                }
            }
            return filterArr[0];
        };
    that.buildUpFilterTree = function( filter ) { // filter is string
        var tmpArr;
        tmpArr = splitStringToArray( filter );
        tmpArr = divideToFunctionsAndValues( tmpArr );
        tmpArr = addValuesAsChildren( tmpArr[0], tmpArr[1] );
        return filterArrToTree( tmpArr );
    };
    return that;
})();

//sub method for filterItems with filter methods
filterItems.filterMethods = (function() {
    var that = {};

    that.eq = function( value, items, context ) { // value is array: value[0] - param, value[1] - value
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;
        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) === value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) === value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };

    that.and = function( values, items, context ) {
        return _.intersection.apply( _, values );
    };

    that.or = function( values, items, context ) {
        return _.union.apply( _, values );
    };

    that.not = function( values, items, context ) { // values[0] is array
        var tmpResult = items.slice();
        return _.difference( tmpResult, values[0] );
    };

    that.notEq = function( value, items, context ) {
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) !== value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) !== value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };
    // compare for numbers and dates
    that.gt = function( value, items, context ) { // value is array: value[0] - param, value[1] - value
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) > value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) > value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };
    // compare for numbers and dates
    that.gte = function( value, items, context ) { // value is array: value[0] - param, value[1] - value
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) >= value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) >= value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };
    // compare for numbers and dates
    that.lt = function( value, items, context ) { // value is array: value[0] - param, value[1] - value
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) < value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) < value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };
    // compare for numbers and dates
    that.lte = function( value, items, context ) { // value is array: value[0] - param, value[1] - value
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( globalUI.getPropertyValue( items[i][context][j], value[0] ) <= value[1] ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( globalUI.getPropertyValue( items[i], value[0] ) <= value[1] ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };

    that.in = function( values, items, context ) { // values[1] is array
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( _.indexOf( values[1], globalUI.getPropertyValue( items[i][context][j], values[0] ) ) !== -1 ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( _.indexOf( values[1], globalUI.getPropertyValue( items[i], values[0] ) ) !== -1 ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };

    that.notIn = function( values, items, context ) { // values[1] is array
        var tmpResult = [],
            tmpResult2,
            length,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            if( context ) {
                tmpResult2 = [];
                if( items[i][context] === undefined ) {
                    length = -1;
                } else {
                    length = items[i][context].length;
                }
                for( var j = 0, jj = length; j < jj; j += 1 ) {
                    if( _.indexOf( values[1], globalUI.getPropertyValue( items[i][context][j], values[0] ) ) === -1 ) {
                        tmpResult2.push( items[i] );
                    }
                }
                if( length === tmpResult2.length ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( _.indexOf( values[1], globalUI.getPropertyValue( items[i], values[0] ) ) === -1 ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };

    that.exists = function( value, items, context ) { // value[1] is string
        var tmpResult = [],
            tmpValue,
            globalUI = InfinniUI.ObjectUtils;

        if( value[1] === undefined ) {
            value[1] = true;
        }
        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpValue = globalUI.getPropertyValue( items[i], value[0] );
            if( value[1] === true ) {
                if( !_.isUndefined( tmpValue ) && !_.isNull( tmpValue ) ) {
                    tmpResult.push( items[i] );
                }
            } else {
                if( _.isUndefined( tmpValue ) || _.isNull( tmpValue ) ) {
                    tmpResult.push( items[i] );
                }
            }
        }
        return tmpResult;
    };

    that.match = function( values, items, context ) {
        var tmpResult = [],
            globalUI = InfinniUI.ObjectUtils;
        for( var i = 0, ii = values[1].length; i < ii; i += 1 ) {
            if( globalUI.getPropertyValue( values[1][i], values[0] ) !== undefined ) {
                tmpResult.push( values[1][i] );
            }
        }
        return tmpResult;
    };

    that.all = function( values, items, context ) { // value[1] is array
        var tmpResult = [],
            counter,
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], values[0] );
            counter = 0;
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( _.indexOf( values[1], tmpArr[j] ) !== -1 ) {
                    counter += 1;
                }
            }
            if( jj === counter ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.anyIn = function( values, items, context ) { // value[1] is array
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], values[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( _.indexOf( values[1], tmpArr[j] ) !== -1 ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.anyNotIn = function( values, items, context ) { // value[1] is array
        var tmpResult = [],
            counter,
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], values[0] );
            counter = 0;
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( _.indexOf( values[1], tmpArr[j] ) !== -1 ) {
                    counter += 1;
                }
            }
            if( counter === 0 ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.anyEq = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( _.indexOf( tmpArr, value[1] ) !== -1 ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.anyNotEq = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( tmpArr[j] !== value[1] ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.anyGt = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( tmpArr[j] > value[1] ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.anyGte = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( tmpArr[j] >= value[1] ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.anyLt = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( tmpArr[j] < value[1] ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.anyLte = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            for( var j = 0, jj = tmpArr.length; j < jj; j += 1 ) {
                if( tmpArr[j] <= value[1] ) {
                    tmpResult.push( items[i] );
                    break;
                }
            }
        }
        return tmpResult;
    };

    that.sizeEq = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length === value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.sizeNotEq = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length !== value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.sizeGt = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length > value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.sizeGte = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length >= value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.sizeLt = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length < value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.sizeLte = function( value, items, context ) {
        var tmpResult = [],
            tmpArr,
            globalUI = InfinniUI.ObjectUtils;

        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpArr = globalUI.getPropertyValue( items[i], value[0] );
            if( tmpArr.length <= value[1] ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.regexp = function( values, items, context ) { // value[1] is array
        var tmpResult = [],
            tmpObjValue,
            globalUI = InfinniUI.ObjectUtils,
            flags = '',
            regexp;
        for( var j = 1, jj = values[1].length; j < jj; j += 1 ) {
            flags += values[1][j];
        }
        regexp = new RegExp( values[1][0], flags );
        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpObjValue = globalUI.getPropertyValue( items[i], values[0] );
            if( tmpObjValue.search( regexp ) !== -1 ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    // ToDo: добавить обработку параметров caseSensitive и diacriticSensitive
    that.text = function( value, items, context ) {
        var tmpResult = [],
            tmpString,
            subString = value[0].replace( '_', ' ' ).toLowerCase();
        for( var i = 0, ii = items.length; i < ii; i += 1 ) {
            tmpString = JSON.stringify( items[i] ).toLowerCase();
            if( tmpString.indexOf( subString ) !== -1 ) {
                tmpResult.push( items[i] );
            }
        }
        return tmpResult;
    };

    that.startsWith = function( value, items, context ) {
        var propertyName = value[0],
            expectedStartValue = _.isArray( value[1] ) ? value[1][0] : value[1],
            ignoreCase = _.isArray( value[1] ) ? (value[1][1] !== false) : true;

        var regexpPattern = '^{expectedStartValue}'.replace( '{expectedStartValue}', expectedStartValue ),
            regexpFlag = ignoreCase ? 'i' : '';

        var result = _.filter( items, function( item ) {
            return new RegExp( regexpPattern, regexpFlag ).test( item[propertyName] );
        } );

        return result;
    };

    that.endsWith = function( value, items, context ) {
        var propertyName = value[0],
            expectedEndValue = _.isArray( value[1] ) ? value[1][0] : value[1],
            ignoreCase = _.isArray( value[1] ) ? (value[1][1] !== false) : true;

        var regexpPattern = '{expectedEndValue}$'.replace( '{expectedEndValue}', expectedEndValue ),
            regexpFlag = ignoreCase ? 'i' : '';

        var result = _.filter( items, function( item ) {
            return new RegExp( regexpPattern, regexpFlag ).test( item[propertyName] );
        } );

        return result;
    };

    that.contains = function( value, items, context ) {
        var propertyName = value[0],
            searchString = _.isArray( value[1] ) ? value[1][0] : value[1] || '',
            ignoreCase = _.isArray( value[1] ) ? (value[1][1] !== false) : true;

        var regexpFlag = ignoreCase ? 'i' : '';

        var result = _.filter( items, function( item ) {
            return new RegExp( searchString, regexpFlag ).test( item[propertyName] );
        } );

        return result;
    };

    return that;
})();
