var RestDataProvider = function(){

    this.requestParams = {
        'get': {
            type: 'get',
            origin: null, // http://abs.com
            path: '',
            data: {}
        },

        'set':{
            type: 'post',
            origin: null,
            path: '',
            data: {}
        },

        'delete':{
            type: 'delete',
            origin: null,
            path: '',
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
        var requestParams;

        var filesInData = this.extractFilesFromData(params.data);

        if( _.size(filesInData.files) == 0){

            requestParams = {
                type: params.type,
                xhrFields: {
                    withCredentials: true
                },
                url: urlString,
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
            };

            if(params.type.toLowerCase() != 'get'){
                requestParams.contentType = 'application/json';
                requestParams.data = JSON.stringify( params.data );
            }else{
                if(_.size(requestParams.data) > 0){
                    requestParams.url = requestParams.url + '?' + this.joinDataForQuery(requestParams.data);
                }
            }

        }else{

            var formData = new FormData();
            formData.append('document', JSON.stringify( filesInData.dataWithoutFiles ));

            for(var k in filesInData.files){
                formData.append(k, filesInData.files[k]);
            }


            requestParams = {
                type: params.type,
                url: urlString,
                xhrFields: {
                    withCredentials: true
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
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
            };
        }

        $.ajax(requestParams);

        return requestId;
    },

    getItems: function(successHandler, errorHandler){
        return this.send('get', successHandler, errorHandler);
    },

    saveItem: function(item, successHandler, errorHandler){
        this.requestParams['set'].data = item;
        return this.send('set', successHandler, errorHandler);
    },

    deleteItem: function(item, successHandler, errorHandler){
        return this.send('delete', successHandler, errorHandler);
    },

    createItem: function (resultCallback, idProperty) {
       var that = this;
        setTimeout( function(){
            resultCallback(that.createLocalItem(idProperty));
        }, 10);
    },

    createLocalItem: function (idProperty) {
        var result = {};

        result[idProperty] = this._generateLocalId();
        result['__Id'] = result[idProperty];

        return result;
    },

    _generateLocalId: function(){
        return guid();
    },

    joinDataForQuery: function(data){
        var result = [];

        for(var k in data){
            result.push(k + '=' + data[k]);
        }

        return result.join('&');
    },

    extractFilesFromData: function (data) {

        var files = Object.create(null);
        var dataWithoutFiles = extractFilesFromNode(data, []);


        return {
            dataWithoutFiles: dataWithoutFiles,
            files: files
        };

        function extractFilesFromNode (node, path) {
            var value, result = Array.isArray(node) ? [] : {}, currentPath;
            for (var i in node) {
                if (!node.hasOwnProperty(i)) {
                    continue;
                }

                currentPath = path.slice();
                currentPath.push(i);
                value = node[i];
                if (value !== null && typeof (value) === 'object') {
                    if (value.constructor === Date) {
                        result[i] = value
                    } else if (value.constructor === Object || value.constructor === Array)  {
                        //Plain object
                        result[i] = extractFilesFromNode(value, currentPath);
                    } else {
                        //Object instance
                        files[currentPath.join('.')] = value;
                        continue;
                    }
                } else {
                    result[i] = value;
                }

            }

            return result;
        }
    }


});