var RestDataProvider = function(){

    this.origin = null; // http://abs.com

    this.type = 'GET';

    this.params = {
        path: '',
        query: null,
        data: {}
    };

};

_.extend(RestDataProvider.prototype, {

    getOrigin: function(){
        return this.origin;
    },

    setOrigin: function(newOrigin){
        this.origin = newOrigin;
    },

    getParams: function(){
        return this.params;
    },

    setParams: function(newParams){
        this.params = newParams;
    },

    mergeParams: function(params){
        this.params = _.extend(this.params, params);
    },

    getPath: function(){
        return this.params.path;
    },

    setPath: function(path){
        this.params.path = path;
    },

    getQuery: function(){
        return this.params.query;
    },

    setQuery: function(query){
        this.params.query = query;
    },

    getData: function(){
        return this.params.data;
    },

    setData: function(data){
        this.params.data = data;
    },

    getType: function(){
        return this.type;
    },

    setType: function(type){
        this.type = type;
    },

    send: function(successHandler, errorHandler){
        var urlString = this.origin + this.params.path;
        var queryString;
        var requestId = Math.round((Math.random() * 100000));

        if(this.params.query){
            queryString = $.param(this.params.query);
            urlString = '?' + queryString;
        }

        $.ajax({
            type: this.type,
            url: urlString,
            data: this.params.data,
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
    }


});