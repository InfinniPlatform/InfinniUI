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
    }
};