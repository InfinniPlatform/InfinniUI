var RestDataProvider = function(){

    this.requestParams = {
        'get': {
            method: 'get',
            origin: null, // http://abs.com
            path: '',
            data: {}
        },

        'set':{
            method: 'post',
            origin: null,
            path: '',
            data: {}
        },

        'delete':{
            method: 'delete',
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

    getMethod: function(type){
        return this.requestParams[type].method;
    },

    setMethod: function(type, queryMethod){
        this.requestParams[type].method = queryMethod;
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
                type: params.method,
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
                    if (typeof errorHandler !== 'function') {
                        //Unhandled error
                        InfinniUI.global.logger.error(data);
                        return;
                    }
                    errorHandler({
                        requestId: requestId,
                        data: data
                    });
                }
            };

            if(params.method.toLowerCase() != 'get'){
                requestParams.contentType = 'application/json';
                requestParams.data = JSON.stringify( params.data );
            }else{
                if(_.size(params.data) > 0){
                    requestParams.url = requestParams.url + '?' + stringUtils.joinDataForQuery(params.data);
                }
            }

        }else{

            var formData = new FormData();
            formData.append('document', JSON.stringify( filesInData.dataWithoutFiles ));

            for(var k in filesInData.files){
                formData.append(k, filesInData.files[k]);
            }


            requestParams = {
                type: params.method,
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

        return result;
    },

    _generateLocalId: function(){
        return guid();
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