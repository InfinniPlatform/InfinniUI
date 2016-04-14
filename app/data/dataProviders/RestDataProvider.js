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
        var requestParams;

        var filesInData = this.extractFilesFromData(params.data);

        if(filesInData.files.length == 0){

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
            formData.append('file', $('input[type=file]')[0].files[0]);

            $.ajax({
                type:'POST',
                url: 'imageUploader.php',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success:function(data) {
                },
                error: function(data) {
                }
            });

            requestParams = {
                type: params.type,
                xhrFields: {
                    withCredentials: true
                },
                contentType: 'application/json',
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
            };
        }

        $.ajax(requestParams);

        return requestId;
    },

    getItems: function(successHandler, errorHandler){
        return this.send('get', successHandler, errorHandler);
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