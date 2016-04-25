var RestDataSource = newBaseDataSource.extend({

    initialize: function(){
        newBaseDataSource.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));

        var model = this.get('model');
        model.urlParams = {
            get: {
                origin: null,
                path: '',
                data: {},
                params: {}
            },

            post: {
                origin: null,
                path: '',
                data: {},
                params: {}
            },

            delete: {
                origin: null,
                path: '',
                data: {},
                params: {}
            }
        };

        this.initUrlParamsHandlers();
    },

    initDataProvider: function(){
        var dataProvider = window.providerRegister.build('RestDataSource');
        this.set('dataProvider', dataProvider);
    },

    initUrlParamsHandlers: function(){
        var that = this;

        this.get('model').onPropertyChanged('urlParams.get.*', function(context, args){
            var dataProvider = that.get('dataProvider');
            var urlParams = that.getGettingUrlParams();
            var templated;

            dataProvider.setOrigin('get', urlParams.origin);
            templated = that._templateParamsInStr(urlParams.path, urlParams.params);
            dataProvider.setPath('get', templated);
            templated = that._templateParamsInObject(urlParams.data, urlParams.params);
            dataProvider.setData('get', templated);


            if( that.get('isDataReady') || that.get('isRequestInProcess') || that.get('waitingOnUpdateItemsHandlers').length > 0 ){ // ds was resolved or waiting resolving
                that.updateItems();
            }
        });

        this.get('model').onPropertyChanged('urlParams.set.*', function(context, args){
            var dataProvider = that.get('dataProvider');
            var urlParams = that.getSettingUrlParams();
            var templated;

            dataProvider.setOrigin('set', urlParams.origin);
            templated = that._templateParamsInStr(urlParams.path, urlParams.params);
            dataProvider.setPath('set', templated);
            templated = that._templateParamsInObject(urlParams.data, urlParams.params);
            dataProvider.setData('set', templated);
        });

        this.get('model').onPropertyChanged('urlParams.delete.*', function(context, args){
            var dataProvider = that.get('dataProvider');
            var urlParams = that.getDeletingUrlParams();
            var templated;

            dataProvider.setOrigin('delete', urlParams.origin);
            templated = that._templateParamsInStr(urlParams.path, urlParams.params);
            dataProvider.setPath('delete', templated);
            templated = that._templateParamsInObject(urlParams.data, urlParams.params);
            dataProvider.setData('delete', templated);
        });
    },

    updateItems: function(){

        if(this._checkGettingUrlParamsReady()){
            newBaseDataSource.prototype.updateItems.apply(this, Array.prototype.slice.call(arguments));
            this.resumeUpdate('urlGettingParamsNotReady');

        }else{
            this.suspendUpdate('urlGettingParamsNotReady');
            newBaseDataSource.prototype.updateItems.apply(this, Array.prototype.slice.call(arguments));
        }

    },

    getGettingUrlParams: function(propertyName){
        if(arguments.length == 0){
            propertyName = 'urlParams.get';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.get';
            }else{
                propertyName = 'urlParams.get.' + propertyName;
            }
        }
        return this.get('model').getProperty(propertyName);
    },

    setGettingUrlParams: function(propertyName, value){
        if(arguments.length == 1){
            value = propertyName;
            propertyName = 'urlParams.get';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.get';
            }else{
                propertyName = 'urlParams.get.' + propertyName;
            }
        }

        this.get('model').setProperty(propertyName, value);
    },

    getSettingUrlParams: function(propertyName){
        if(arguments.length == 0){
            propertyName = 'urlParams.set';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.set';
            }else{
                propertyName = 'urlParams.set.' + propertyName;
            }
        }
        return this.get('model').getProperty(propertyName);
    },

    setSettingUrlParams: function(propertyName, value){
        if(arguments.length == 1){
            value = propertyName;
            propertyName = 'urlParams.set';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.set';
            }else{
                propertyName = 'urlParams.set.' + propertyName;
            }
        }

        this.get('model').setProperty(propertyName, value);
    },

    getDeletingUrlParams: function(propertyName){
        if(arguments.length == 0){
            propertyName = 'urlParams.delete';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.delete';
            }else{
                propertyName = 'urlParams.delete.' + propertyName;
            }
        }
        return this.get('model').getProperty(propertyName);
    },

    setDeletingUrlParams: function(propertyName, value){
        if(arguments.length == 1){
            value = propertyName;
            propertyName = 'urlParams.delete';

        }else{
            if(propertyName == ''){
                propertyName = 'urlParams.delete';
            }else{
                propertyName = 'urlParams.delete.' + propertyName;
            }
        }

        this.get('model').setProperty(propertyName, value);
    },

    _checkGettingUrlParamsReady: function(){
        var allParams = [];
        var strWithParams;
        var params;
        var data;
        var definedParams;
        var param;

        if(!this._checkUrlParamsReady(this.getGettingUrlParams())){
            return false;
        }

        strWithParams = this.getGettingUrlParams('path');
        params = this._findSubstitutionParams(strWithParams);
        allParams = allParams.concat(params);

        data = this.getGettingUrlParams('data');
        strWithParams = JSON.stringify(data);
        params = this._findSubstitutionParams(strWithParams);
        allParams = allParams.concat(params);

        definedParams = this.getGettingUrlParams('params');
        for(var i = 0, ii = allParams.length; i<ii; i++){
            param = allParams[i];
            if(definedParams[param] === undefined){
                return false;
            }
        }

        return true;
    },

    _checkUrlParamsReady: function(params){
        return params && typeof params.origin == 'string'// && params.origin.lentgh > 0
                && typeof params.path == 'string'
                && typeof params.data == 'object'
                && typeof params.params == 'object';
    },

    _findSubstitutionParams: function(str){
        if(!str){
            return [];
        }

        var result = [];
        str.replace(/<%([\s\S]+?)%>/g, function(p1, p2){
            result.push(p2);
            return p1;
        });

        return result;
    },

    _templateParamsInStr: function(str, params){
        if(!str || !params){
            return str;
        }

        return str.replace(/<%([\s\S]+?)%>/g, function(p1, p2){
            return params[p2];
        });
    },

    _templateParamsInObject: function(obj, params){
        if(!obj || !params){
            return obj;
        }

        var str = JSON.stringify(obj);
        var tmpTemplated = this._templateParamsInStr(str, params);
        return JSON.parse(tmpTemplated);
    }//,
    //
    //_handleUpdatedItemsData: function (itemsData, successHandler, errorHandler) {
    //    var items = itemsData['Result']['Items'];
    //    newBaseDataSource.prototype._handleUpdatedItemsData.call(this, items, successHandler, errorHandler);
    //}

});