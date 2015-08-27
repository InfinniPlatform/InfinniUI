function BaseDataSourceBuilder(){};

_.extend(BaseDataSourceBuilder.prototype, {
    build: function (context, args) {
        var dataSource = this.createDataSource(args.view);
        dataSource.suspendUpdate();

        this.applyMetadata(args.builder, args.view, args.metadata, dataSource);

        if(args.view.onLoading){
            args.view.onLoading(function () {
                dataSource.resumeUpdate();
            });
        }else{
            dataSource.resumeUpdate();
        }

        return dataSource;
    },

    applyMetadata: function(builder, parent, metadata, dataSource){
        var idProperty = metadata.IdProperty;
        if (idProperty) {
            dataSource.setIdProperty(idProperty);
        }

        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);
        dataSource.setPageSize(metadata.PageSize || 15);
        dataSource.setPageNumber(metadata.PageNumber || null);

        dataSource.setErrorValidator(metadata.ValidationErrors);
        dataSource.setWarningValidator(metadata.ValidationWarnings);

        this.initScriptsHandlers(parent, metadata, dataSource);
    },

    createDataSource: function(parent){
        throw 'BaseDataSourceBuilder.createDataSource В потомке BaseDataSourceBuilder не переопределен метод createDataSource.';
    },

    initScriptsHandlers: function (parent, metadata, dataSource) {
        //Скриптовые обработчики на события
        if (parent && metadata.OnSelectedItemChanged) {
            dataSource.onSelectedItemChanged(function () {
                    new ScriptExecutor(parent).executeScript(metadata.OnSelectedItemChanged.Name);
            });
        }

        if (parent && metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnItemsUpdated.Name);
            });
        }

        if (parent && metadata.OnSelectedItemModified) {
            dataSource.onSelectedItemModified(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnSelectedItemModified.Name);
            });
        }

        if (parent && metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function () {
                new ScriptExecutor(parent).executeScript(metadata.OnItemDeleted.Name);
            });
        }
    }
});