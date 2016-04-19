function ServerAction(parentView) {
    _.superClass(ServerAction, this, parentView);
    this.updateContentTypeStrategy();
    this.on('change:contentType', this.updateContentTypeStrategy);
}

_.inherit(ServerAction, BaseAction);

_.extend(ServerAction.prototype, {

    defaults: {
        contentType: 'Object',
        method: 'GET',
        data: {}
    },

    updateContentTypeStrategy: function () {
        var contentType = this.getProperty('contentType');
        this.contentTypeStrategy = serverActionContentTypeStrategy[contentType];
    },

    execute: function (callback) {
        this.contentTypeStrategy.run(this.getProperty('provider'), this._getRequestData(), callback);
    },

    setParam: function(name, value) {
        this.setProperty('params.' + name, value);
    },

    getParam: function(name) {
        return this.getProperty('params.' + name);
    },

    _getRequestData: function () {
        var origin = this._replaceParamsInStr( this.getProperty('origin') );
        var path = this._replaceParamsInStr( this.getProperty('path') );
        var method = this.getProperty('method').toUpperCase();
        var data = this._replaceParamsInObject( this.getProperty('data') );

        var result = {};
        result.requestUrl = origin + path;
        result.method = method;

        if( !_.isEmpty(data) ){
            if( method == 'GET') {
                result.requestUrl = result.requestUrl + '?' + stringUtils.joinDataForQuery(data);
            } else {
                result.args = data;
            }
        }

        return result;
    },

    _replaceParamsInStr: function(str){
        if(!str){
            return str;
        }

        var that = this;

        return str.replace(/<%([\s\S]+?)%>/g, function(p1, p2){
            return that.getParam(p2);
        });
    },

    _replaceParamsInObject: function(obj){
        if(_.isEmpty(obj) ){
            return obj;
        }

        var str = JSON.stringify(obj);
        var replacedStr = this._replaceParamsInStr(str);
        return JSON.parse(replacedStr);
    }
});
