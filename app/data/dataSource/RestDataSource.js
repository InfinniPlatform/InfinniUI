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


            if( that.get('isDataReady') || that.get('isRequestInProcess') || that.get('waitingOnUpdateItemsHandlers').length > 0 ){ // ds was resolved or wait resolving
                that.updateItems();
            }
            //������� ��������
            //1) ��������������� ��� �����
            //1.1) checkReadyUrl - �������� �� � path � ��� � data, ���� ��� ��������� ���� � �� ���� �� ����� undefined - url �����. �������� � ���������� path � data
            //1.2) ������� ��������� �� ������������ url ����������. ���� DS ������������, ������ updateItems
            //1.3) ���� ���� ��������� ��������� - ������������ DS 'urlGettingParamsNotReady'
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

    _findSubstitutionParams: function(str){
        var result = [];
        str.replace(/<%([\s\S]+?)%>/g, function(p1, p2){
            result.push(p2);
            return p1;
        });

        return result;
    },

    _templateParamsInStr: function(str, params){
        return str.replace(/<%([\s\S]+?)%>/g, function(p1, p2){
            return params[p2];
        });
    },

    _templateParamsInObject: function(obj, params){
        var str = JSON.stringify(obj);
        var tmpTemplated = this._templateParamsInStr(str, params);
        return JSON.parse(tmpTemplated);
    }

});