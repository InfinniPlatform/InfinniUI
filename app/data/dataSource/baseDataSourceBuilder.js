function BaseDataSourceBuilder() {

    this.build = function (metadata, dataSource, parent, builder) {

        dataSource.suspendUpdate();
        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);
        dataSource.setSorting(metadata.Sorting);
        dataSource.setPageSize(metadata.PageSize || 15);
        dataSource.setPageNumber(metadata.PageNumber || null);

        var criteriaConstructor = function (data) {
            //Добавлен
            var criteria;

            if (typeof data === 'undefined' || data === null) {
                return;
            }


            if (_.isArray(data)) {
                //Переданы метаданные для создания Criteria
                criteria = builder.buildType(parent, 'Criteria', data);
            } else {
                //Передан созданный экземпляр. Добавлено для совместимости со старой реализацией.
                criteria = data;
            }
            return criteria;
        };

        dataSource.setCriteriaConstructor(criteriaConstructor);

        var queryFilter = builder.buildType(parent, 'Criteria', metadata.Query);

        queryFilter.onValueChanged(function () {
            dataSource.updateItems();
        });

        dataSource.setQueryFilter(queryFilter);

        this.initScriptsHandlers(parent, metadata, dataSource, builder);

        buildValidation.apply(this, arguments);

        var exchange = parent.getExchange();
        exchange.subscribe(messageTypes.onLoading, function () {
            if(dataSource.initingDataStrategy == 'previouslyInitingData' || dataSource.initingDataStrategy == 'manualInitingData'){
                dataSource.resumeUpdate();
            }else{
                dataSource.loadingProcessDone();
            }

        });
        exchange.subscribe(messageTypes.onSetSelectedItem, function (value) {
            if (dataSource.getName() === value.dataSource && !value.property) {
                console.log('BaseDataSourceBuilder.messageTypes.onSetSelectedItem', dataSource.getName());
                dataSource.setSelectedItem(value.value);
            }
        });
        exchange.subscribe(messageTypes.onSetTextFilter, function (value) {
            if (value.dataSource === dataSource.getName()) {
                dataSource.setTextFilter(value.value);
            }
        });
        exchange.subscribe(messageTypes.onSetPropertyFilters, function (value) {
            if (value.dataSource === dataSource.getName()) {
                dataSource.setPropertyFilters(value.value);
            }
        });
        exchange.subscribe(messageTypes.onSetPageNumber, function (value) {
            if (value.dataSource === dataSource.getName()) {
                dataSource.setPageNumber(value.value);
            }
        });
        exchange.subscribe(messageTypes.onSetPageSize, function (value) {
            if (value.dataSource === dataSource.getName()) {
                dataSource.setPageSize(value.value);
            }
        });
    };

    this.initScriptsHandlers = function (parent, metadata, dataSource, builder) {
        //Скриптовые обработчики на события
        if (parent) {
            dataSource.onSelectedItemChanged(function () {
                var exchange = parent.getExchange();
                var selectedItem = dataSource.getSelectedItem();

                exchange.send(messageTypes.onSelectedItemChanged, {
                    DataSource: dataSource.getName(),
                    Value: selectedItem
                });

                if (metadata.OnSelectedItemChanged) {
                    var message = builder.buildType(parent, 'DataSourceMessage', null, null, {
                        source: dataSource,
                        value: selectedItem,
                        dataSource: dataSource.getName()
                    });
                    new ScriptExecutor(parent).executeScript(metadata.OnSelectedItemChanged.Name, message);
                }
            });
        }

        if (parent && metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function () {
                var message = builder.buildType(parent, 'DataSourceMessage', null, null, {
                    source: dataSource,
                    value: dataSource.getDataItems(),
                    dataSource: dataSource.getName()
                });

                new ScriptExecutor(parent).executeScript(metadata.OnItemsUpdated.Name, message);
            });
        }

        if (parent && metadata.OnSelectedItemModified) {
            dataSource.onSelectedItemModified(function () {
                var message = builder.buildType(parent, 'DataSourceMessage', null, null, {
                    source: dataSource,
                    value: dataSource.getSelectedItem(),
                    dataSource: dataSource.getName()
                });

                new ScriptExecutor(parent).executeScript(metadata.OnSelectedItemModified.Name, message);
            });
        }

        if (parent && metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function (context, args) {
                var message = builder.buildType(parent, 'DataSourceMessage', null, null, {
                    source: dataSource,
                    value: args.value,
                    dataSource: dataSource.getName()
                });

                new ScriptExecutor(parent).executeScript(metadata.OnItemDeleted.Name, message);
            });
        }
    };

    /**
     * Создает компонент для валидации
     * @param metadata
     * @param dataSource
     * @param parent
     * @param builder
     */
    function buildValidation(metadata, dataSource, parent) {
        var builder = new ValidationBuilder(),
            validationErrors, validationWarnings;

        if (typeof metadata.ValidationErrors !== 'undefined') {
            validationErrors = builder.build(undefined, parent, metadata.ValidationErrors);
        }

        if (typeof metadata.ValidationWarnings !== 'undefined') {
            validationWarnings = builder.build(undefined, parent, metadata.ValidationWarnings);
        }

        dataSource.validation = new DataSourceValidator(dataSource, validationWarnings, validationErrors);

        var exchange = parent.getExchange();
        exchange.subscribe(messageTypes.onValidate, function (message) {
            if (message && message.dataSource === dataSource.getName()) {
                dataSource.validation.validate();
                dataSource.validation.notifyElements(message.property);
            }
        });
    }

}
