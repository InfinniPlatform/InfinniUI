var FakeRestDataProvider = function(){
    _.superClass(FakeRestDataProvider, this);
};

_.inherit(FakeRestDataProvider, RestDataProvider);

_.extend( FakeRestDataProvider.prototype, {

    items: [],
    lastSendedUrl: '',

    send: function(type, successHandler, errorHandler){
        var requestId = Math.round((Math.random() * 100000));
        var params = this.requestParams[type];
        var that = this;


        var urlString = params.origin + params.path;
        var queryString;

        if(params.query){
            queryString = $.param(params.query);
            urlString = '?' + queryString;
        }

        this.lastSendedUrl = urlString;

        setTimeout(function(){
            successHandler({
                requestId: requestId,
                data: that.items
            });
        }, 1);

        return requestId;
    }

});