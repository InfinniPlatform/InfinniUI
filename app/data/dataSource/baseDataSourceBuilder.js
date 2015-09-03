function BaseDataSourceBuilder(){};

_.extend(BaseDataSourceBuilder.prototype, {
    build: function (context, args) {
        var dataSource = this.createDataSource(args.parentView);
        dataSource.suspendUpdate();

        this.applyMetadata(args.builder, args.parentView, args.metadata, dataSource);

        if(args.parentView.onLoading){
            args.parentView.onLoading(function () {
                dataSource.resumeUpdate();
                dataSource.updateItems();
            });
        }else{
            dataSource.resumeUpdate();
            dataSource.updateItems();
        }

        return dataSource;
    },

    applyMetadata: function(builder, parentView, metadata, dataSource){
        var idProperty = metadata.IdProperty;
        if (idProperty) {
            dataSource.setIdProperty(idProperty);
        }

        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);
        dataSource.setPageSize(metadata.PageSize || 15);
        dataSource.setPageNumber(metadata.PageNumber || 0);

        dataSource.setErrorValidator(metadata.ValidationErrors);
        dataSource.setWarningValidator(metadata.ValidationWarnings);

        this.initScriptsHandlers(parentView, metadata, dataSource);
    },

    createDataSource: function(parent){
        throw 'BaseDataSourceBuilder.createDataSource В потомке BaseDataSourceBuilder не переопределен метод createDataSource.';
    },

    initScriptsHandlers: function (parentView, metadata, dataSource) {
        //Скриптовые обработчики на события
        if (parentView && metadata.OnSelectedItemChanged) {
            dataSource.onSelectedItemChanged(function () {
                    new ScriptExecutor(parentView).executeScript(metadata.OnSelectedItemChanged.Name);
            });
        }

        if (parentView && metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemsUpdated.Name);
            });
        }

        if (parentView && metadata.OnSelectedItemModified) {
            dataSource.onSelectedItemModified(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnSelectedItemModified.Name);
            });
        }

        if (parentView && metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function () {
                new ScriptExecutor(parentView).executeScript(metadata.OnItemDeleted.Name);
            });
        }
    }
});