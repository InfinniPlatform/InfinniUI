var urlManager = {
    getParams: function(){
        var getPath = location.search,
            result = {},
            params, tmpParam;

        if(getPath.length == 0){
            return result;
        }

        getPath = getPath.substr(1);
        params = getPath.split('&');

        for(var i= 0, ii = params.length; i<ii; i++) {
            tmpParam = params[i].split("=");
            result[tmpParam[0]] = tmpParam[1];
        }

        return result;
    },

    clearUrlSearchPath: function(){
        var searchPath = location.search,
            index, newUrl;

        if(searchPath.length > 0){
            index = location.href.indexOf(searchPath);
            if(index > 0){
                newUrl = location.href.substr(0, index);
            }
        }

        if(newUrl){
            history.pushState(null, null, newUrl);
        }

    }
};