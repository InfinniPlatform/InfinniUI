var RestDataProvider = function(){

    this.requestParams = {
        'get': {
            type: 'get',
            origin: null, // http://abs.com
            path: '',
            query: null,
            data: {}
        },

        'set':{
            type: 'post',
            origin: null,
            path: '',
            query: null,
            data: {}
        },

        'delete':{
            type: 'delete',
            origin: null,
            path: '',
            query: null,
            data: {}
        }
    };

};

_.extend(RestDataProvider.prototype, {

    getOrigin: function(type){
        return this.requestParams[type].origin;
    },

    setOrigin: function(type, newOrigin){
        this.requestParams[type].origin = newOrigin;
    },

    getPath: function(type){
        return this.requestParams[type].path;
    },

    setPath: function(type, path){
        this.requestParams[type].path = path;
    },

    getQuery: function(type){
        return this.requestParams[type].query;
    },

    setQuery: function(type, query){
        this.requestParams[type].query = query;
    },

    getData: function(type){
        return this.requestParams[type].data;
    },

    setData: function(type, data){
        this.requestParams[type].data = data;
    },

    getType: function(type){
        return this.requestParams[type].type;
    },

    setType: function(type, queryType){
        this.requestParams[type].type = queryType;
    },

    send: function(type, successHandler, errorHandler){
        var params = this.requestParams[type];

        var urlString = params.origin + params.path;
        var queryString;
        var requestId = Math.round((Math.random() * 100000));

        if(params.query){
            queryString = $.param(params.query);
            urlString = '?' + queryString;
        }

        $.ajax({
            type: params.type,
            url: urlString,
            data: params.data,
            success: function(data){
                successHandler({
                    requestId: requestId,
                    data: data
                });
            },
            error: function(data){
                errorHandler({
                    requestId: requestId,
                    data: data
                });
            }
        });

        return requestId;
    },

    getItems: function(successHandler, errorHandler){
        return this.send('get', successHandler, errorHandler);
    }


});