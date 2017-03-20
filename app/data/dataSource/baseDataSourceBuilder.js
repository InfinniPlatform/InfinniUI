/**
 * @constructor
 * @mixes DataSourceValidationNotifierMixin
 */
var BaseDataSourceBuilder = function() {
};

_.extend(BaseDataSourceBuilder.prototype, /** @lends BaseDataSourceBuilder.prototype */ {
    build: function (context, args) {
        var dataSource = this.createDataSource(args.parentView);
        dataSource.suspendUpdate('tuningInSourceBuilder');

        this.applyMetadata(args.builder, args.parentView, args.metadata, dataSource);

        this.applySuspended(dataSource, args.suspended);

        dataSource.resumeUpdate('tuningInSourceBuilder');

        return dataSource;
    },

    applySuspended: function (dataSource, suspended) {
        if (!suspended) {
            return;
        }

        for (var name in suspended) {
            if (!suspended.hasOwnProperty(name) || dataSource.getName() !== name) {
                continue;
            }

            dataSource.suspendUpdate(suspended[name]);
        }

    },

    applyMetadata: function (builder, parentView, metadata, dataSource) {
        var idProperty = metadata.IdProperty;
        if (idProperty) {
            dataSource.setIdProperty(idProperty);
        }

        if( 'SuspendUpdate' in metadata ) {
            dataSource.suspendUpdate( metadata['SuspendUpdate'] );
        }

        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);

        if('IsLazy' in metadata){
            dataSource.setIsLazy(metadata['IsLazy']);
        }

        if('ResolvePriority' in metadata){
            dataSource.setResolvePriority(metadata['ResolvePriority']);
        }

        if( _.isObject(metadata.CustomProperties) ) {
            this.initCustomProperties(dataSource, metadata.CustomProperties);
        }

        this.initValidation(parentView, dataSource, metadata);
        this.initNotifyValidation(dataSource);
        this.initScriptsHandlers(parentView, metadata, dataSource);

        this.initFileProvider(dataSource);
    },

    createDataSource: function (parent) {
        throw 'BaseDataSourceBuilder.createDataSource В потомке BaseDataSourceBuilder не переопределен метод createDataSource.';
    },

    initCustomProperties: function(dataSource, customProperties){
        _.each(customProperties, function(value, key){
            dataSource.setProperty('.' + key, value);
        });
    },

    /**
     * @protected
     * @description Инициализация обработчиков для валидации данных
     * @param parentView
     * @param dataSource
     * @param metadata
     */
    initValidation: function (parentView, dataSource, metadata) {
        if (metadata.ValidationErrors) {
            dataSource.setErrorValidator(function (context, args) {
                return new ScriptExecutor(parentView).executeScript(metadata.ValidationErrors.Name || metadata.ValidationErrors, args);
            });
        }
    },

    //Скриптовые обработчики на события
    initScriptsHandlers: function (parentView, metadata, dataSource) {

        if( !parentView ){
            return;
        }

        if (metadata.OnSelectedItemChanged) {
            dataSource.onSelectedItemChanged(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnSelectedItemChanged.Name || metadata.OnSelectedItemChanged, args);
            });
        }

        if (metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemsUpdated.Name || metadata.OnItemsUpdated, args);
            });
        }

        if (metadata.OnPropertyChanged) {
            dataSource.onPropertyChanged(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnPropertyChanged.Name || metadata.OnPropertyChanged, args);
            });
        }

        if (metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemDeleted.Name || metadata.OnItemDeleted, args);
            });
        }

        if (metadata.OnErrorValidator) {
            dataSource.onErrorValidator(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnErrorValidator.Name || metadata.OnErrorValidator, args);
            });
        }

        if (metadata.OnProviderError) {
            dataSource.onProviderError(function (context, args) {
                new ScriptExecutor(parentView).executeScript(metadata.OnProviderError.Name || metadata.OnProviderError, args);
            });
        }
    },

    buildBindingBuilder: function(params){

        return function(bindingMetadata){
            return params.builder.buildBinding(bindingMetadata, {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            });
        };
    },

     initFileProvider: function (dataSource) {

             var host = InfinniUI.config.serverUrl;

             var fileUrlConstructor = new DocumentUploadQueryConstructor(host);

             var fileProvider = new DocumentFileProvider(fileUrlConstructor);

             dataSource.setFileProvider(fileProvider);
     }


});


_.extend(BaseDataSourceBuilder.prototype, DataSourceValidationNotifierMixin);

window.InfinniUI.BaseDataSourceBuilder = BaseDataSourceBuilder;
