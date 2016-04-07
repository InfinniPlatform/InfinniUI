var FakeRestDataProvider = function(){
    _.superClass(FakeRestDataProvider, this);
};

_.inherit(FakeRestDataProvider, RestDataProvider);

_.extend( FakeRestDataProvider.prototype, {

    items: [],

    send: function(type, successHandler, errorHandler){
        var requestId = Math.round((Math.random() * 100000));
        var params = this.requestParams[type];
        var that = this;


        setTimeout(function(){
            successHandler({
                requestId: requestId,
                data: that.items
            });
        }, 10);

        return requestId;
    }

});