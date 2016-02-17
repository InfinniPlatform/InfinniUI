/**
 * @constructor
 * @mixes DataSourceValidationNotifierMixin
 */
function BaseDataSourceBuilder() {
}

_.extend(BaseDataSourceBuilder.prototype, /** @lends BaseDataSourceBuilder.prototype */ {
    build: function (context, args) {
        var dataSource = this.createDataSource(args.parentView);
        dataSource.suspendUpdate();

        var filterManager = new FilterManager(this.buildBindingBuilder(args));
        dataSource.setFilterManager(filterManager);

        this.applyMetadata(args.builder, args.parentView, args.metadata, dataSource);
        this.initFileProvider(dataSource, args.metadata);

        dataSource.resumeUpdate();

        /*if(args.parentView.onLoading){
         args.parentView.onLoading(function () {
         //dataSource.resumeUpdate();
         dataSource.updateItems();
         });
         }else{
         //dataSource.resumeUpdate();
         dataSource.updateItems();
         }*/

        return dataSource;
    },

    applyMetadata: function (builder, parentView, metadata, dataSource) {
        var idProperty = metadata.IdProperty;
        if (idProperty) {
            dataSource.setIdProperty(idProperty);
        }

        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);
        dataSource.setPageSize(metadata.PageSize || 15);
        dataSource.setPageNumber(metadata.PageNumber || 0);

        var queryMetadata;
        if('Query' in metadata){
            dataSource.setFilter(metadata.Query);
        }

        if('IsLazy' in metadata){
            dataSource.setIsLazy(metadata['IsLazy']);
        }

        this.initValidation(parentView, dataSource, metadata);
        this.initNotifyValidation(dataSource);
        this.initScriptsHandlers(parentView, metadata, dataSource);
    },

    createDataSource: function (parent) {
        throw 'BaseDataSourceBuilder.createDataSource В потомке BaseDataSourceBuilder не переопределен метод createDataSource.';
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

        if (metadata.ValidationWarnings) {
            dataSource.setWarningValidator(function (context, args) {
                return new ScriptExecutor(parentView).executeScript(metadata.ValidationWarnings.Name || metadata.ValidationWarnings, args);
            });
        }
    },

    initScriptsHandlers: function (parentView, metadata, dataSource) {
        //Скриптовые обработчики на события
        if (parentView && metadata.OnSelectedItemChanged) {
            dataSource.onSelectedItemChanged(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnSelectedItemChanged.Name || metadata.OnSelectedItemChanged);
            });
        }

        if (parentView && metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemsUpdated.Name || metadata.OnItemsUpdated);
            });
        }

        if (parentView && metadata.OnSelectedItemModified) {
            dataSource.onSelectedItemModified(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnSelectedItemModified.Name || metadata.OnSelectedItemModified);
            });
        }

        if (parentView && metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemDeleted.Name || metadata.OnItemDeleted);
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

    initFileProvider: function (dataSource, metadata) {

    }
});


_.extend(BaseDataSourceBuilder.prototype, DataSourceValidationNotifierMixin);