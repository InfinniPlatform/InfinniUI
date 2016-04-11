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

            if( that._checkGettingUrlParamsReady() ){
                dataProvider.set
            }

            //порядок действий
            //1) устанавливается урл часть
            //1.1) checkReadyUrl - проходим всё в path и все в data, если все параметры есть и ни один не равен undefined - url готов. передаем в провайдеры path и data
            //1.2) снимаем заморозку по неготовности url параметров. Если DS разрезолвлен, делаем updateItems
            //1.3) если есть неготовые параметры - замораживаем DS 'urlGettingParamsNotReady'

            dataProvider.set
        });
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
        allParams.concat(params);

        data = this.getGettingUrlParams('data');
        for(var k in data){
            if(typeof data[k] == 'string'){
                params = this._findSubstitutionParams(data[k]);
                allParams.concat(params);
            }
        }

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
        str.replace(/\{([^\}]*)\}/g, function(p1, p2){
            result.push(p2);
            return p1;
        });

        return result;
    }

});