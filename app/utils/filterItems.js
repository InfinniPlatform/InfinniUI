var filterItems = function(items, filter){

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
};