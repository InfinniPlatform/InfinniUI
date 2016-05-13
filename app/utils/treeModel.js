var TreeModel = function(context, source, startTree){
    this.context = context;
    this.source = source;
    this.dataTree = startTree || {};

    this.handlersTree = {};

    this.mirroringFrom = null;
    this.mirroringTo = null;
};

_.extend(TreeModel.prototype, {

    counter: 1,

    getProperty: function(propertyName){
        if(this.mirroringFrom){
            propertyName = propertyName.replace(this.mirroringFrom, this.mirroringTo);
        }
        return InfinniUI.ObjectUtils.getPropertyValue(this.dataTree, propertyName)
    },

    setProperty: function(propertyName, value){
        var oldValue = this.getProperty(propertyName);
        if(value == oldValue){
            return false;
        }

        InfinniUI.ObjectUtils.setPropertyValue(this.dataTree, propertyName, value);

        this._notifyAboutPropertyChanged(propertyName, oldValue);

        return true;
    },

    simulateSetProperty: function(propertyName, oldValue){
        this._notifyAboutPropertyChanged(propertyName, oldValue);
    },

    onPropertyChanged: function(propertyName, handler, params){
        var handlersNode;
        var bindId = this.counter + '-bindId';
        this.counter ++;

        if(_.isFunction(propertyName)){
            params = handler;
            handler = propertyName;

            handlersNode = this._getHandlersSubTree('*', true);
        }else{
            handlersNode = this._getHandlersSubTree(propertyName, true);
        }

        handler._bindId = bindId;
        if(params && 'owner' in params){
            handler._owner = params.owner;
        }

        handlersNode[bindId] = handler;
    },

    _getHandlersSubTree: function(propertyName, restoreIfNoProperty){
        if(propertyName == ''){
            return this.handlersTree;
        }

        var propertyPaths = propertyName.split('.');
        var tmpResult = this.handlersTree;
        for(var i = 0, ii = propertyPaths.length; i<ii; i++){
            if(tmpResult[propertyPaths[i]]){
                tmpResult = tmpResult[propertyPaths[i]];
            }else{
                if(restoreIfNoProperty){
                    tmpResult[propertyPaths[i]] = {};
                    tmpResult = tmpResult[propertyPaths[i]];
                }else{
                    return {};
                }
            }
        }

        return tmpResult;
    },

    _notifyAboutPropertyChanged: function(propertyName, oldValue){
        var handlers = this._getHandlersSubTree(propertyName);

        var needMirroring = this.mirroringTo != null && this.mirroringFrom != null && propertyName.indexOf(this.mirroringTo) == 0;
        var mirroringPath = propertyName.replace(this.mirroringTo, this.mirroringFrom);

        this._notifyAboutPropertyChanged_bubblingAction(propertyName, oldValue, handlers);

        this._notifyAboutPropertyChanged_capturingAction(propertyName, oldValue, handlers);
        if(needMirroring){
            handlers = this._getHandlersSubTree(mirroringPath);
            this._notifyAboutPropertyChanged_capturingAction(mirroringPath, oldValue, handlers);
        }
    },

    _notifyAboutPropertyChanged_capturingAction: function(propertyName, oldValue, handlersSubTree){
        var tmpValue;
        var tmpProperty;
        var handler;

        for( var k in handlersSubTree ){
            if($.isFunction(handlersSubTree[k])){

                handler = handlersSubTree[k];
                if(this._isOwnerAlive(handler)){
                    this._callHandlerAboutPropertyChanged(handler, propertyName, oldValue);
                }else{
                    delete handlersSubTree[k];
                }

            }
        }

        for( var k in handlersSubTree ){
            if($.isPlainObject(handlersSubTree[k]) && k != '*'){

                tmpValue = $.isPlainObject(oldValue) ? oldValue[k] : undefined;
                tmpProperty = propertyName == '' ? k :propertyName + '.' + k;
                this._notifyAboutPropertyChanged_capturingAction(tmpProperty, tmpValue, handlersSubTree[k]);

            }
        }
    },

    _notifyAboutPropertyChanged_bubblingAction: function(propertyName, oldValue, handlersSubTree){
        var propertyNamePaths = propertyName.split('.');
        var tmpPropertyName;

        var handlersNode = this.handlersTree;
        var that = this;

        checkAndCallAnyHandlers(handlersNode);

        if(propertyName != ''){
            for(var i = 0, ii = propertyNamePaths.length; i < ii; i++){

                tmpPropertyName = propertyNamePaths[i];
                if(handlersNode[tmpPropertyName]){
                    handlersNode = handlersNode[tmpPropertyName];
                    checkAndCallAnyHandlers(handlersNode);

                }else{
                    break;
                }
            }
        }



        function checkAndCallAnyHandlers(_handlersNode){
            var handler;

            if('*' in _handlersNode){
                for( var k in _handlersNode['*'] ){
                    handler = _handlersNode['*'][k];
                    if(that._isOwnerAlive(handler)){
                        that._callHandlerAboutPropertyChanged(handler, propertyName, oldValue);
                    }else{
                        delete _handlersNode['*'][k];
                    }
                }
            }
        }
    },

    _isOwnerAlive: function(handler){
        if(handler._owner && 'isRemoved' in handler._owner){

            if(typeof handler._owner.isRemoved == 'function'){
                return handler._owner.isRemoved();
            }else{
                return !handler._owner.isRemoved;
            }

        }else{
            return true;
        }
    },

    _callHandlerAboutPropertyChanged: function(handler, propertyName, oldValue){
        var args = {
            property: propertyName,
            newValue: this.getProperty(propertyName),
            oldValue: oldValue,
            source: this.source
        };

        handler(this.context, args);
    },

    setMirroring: function(mirroringFrom, mirroringTo){
        this.mirroringFrom = mirroringFrom;
        this.mirroringTo = mirroringTo;
    }

});