function BaseDataSourceBuilder() {

    this.build = function (context, args) {

        var metadata = args.metadata,
            dataSource = args.dataSource,
            view = args.view;

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
                criteria = args.builder.buildType(view, 'Criteria', data);
            } else {
                //Передан созданный экземпляр. Добавлено для совместимости со старой реализацией.
                criteria = data;
            }
            return criteria;
        };

        dataSource.setCriteriaConstructor(criteriaConstructor);

        var queryFilter = args.builder.buildType(view, 'Criteria', metadata.Query);

        queryFilter.onValueChanged(function () {
            dataSource.updateItems();
        });

        dataSource.setQueryFilter(queryFilter);

        this.initScriptsHandlers(view, metadata, dataSource);

        buildValidation.apply(this, arguments);

        var exchange = view.getExchange();
        exchange.subscribe(messageTypes.onLoading, function () {
            if(dataSource.initingDataStrategy == 'previouslyInitingData' || dataSource.initingDataStrategy == 'manualInitingData'){
                dataSource.resumeUpdate();
            }else{
                dataSource.loadingProcessDone();
            }

        });
        exchange.subscribe(messageTypes.onSetSelectedItem, function (value) {
            if (dataSource.getName() === value.dataSource && !value.property) {
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

    this.initScriptsHandlers = function (view, metadata, dataSource) {
        //Скриптовые обработчики на события
        if (view) {
            dataSource.onSelectedItemChanged(function () {
                var exchange = view.getExchange();
                exchange.send(messageTypes.onSelectedItemChanged, {
                    DataSource: dataSource.getName(),
                    Value: dataSource.getSelectedItem()
                });

                if (metadata.OnSelectedItemChanged) {
                    new ScriptExecutor(view).executeScript(metadata.OnSelectedItemChanged.Name);
                }
            });
        }

        if (view && metadata.OnItemsUpdated) {
            dataSource.onItemsUpdated(function () {
                new ScriptExecutor(view).executeScript(metadata.OnItemsUpdated.Name);
            });
        }

        if (view && metadata.OnSelectedItemModified) {
            dataSource.onSelectedItemModified(function () {
                new ScriptExecutor(view).executeScript(metadata.OnSelectedItemModified.Name);
            });
        }

        if (view && metadata.OnItemDeleted) {
            dataSource.onItemDeleted(function () {
                new ScriptExecutor(view).executeScript(metadata.OnItemDeleted.Name);
            });
        }
    };

    /**
     * Создает компонент для валидации
     * @param context
     * @param args
     */
    function buildValidation (context, args) {

        var builder = new ValidationBuilder(),
            validationErrors, validationWarnings;

        if (typeof args.metadata.ValidationErrors !== 'undefined') {
            validationErrors = builder.build(context, {
                                                            view: args.view,
                                                            metadata: args.metadata.ValidationErrors
                                                        });
        }

        if (typeof args.metadata.ValidationWarnings !== 'undefined') {
            validationWarnings = builder.build(context, {
                                                            view: args.view,
                                                            metadata: args.metadata.ValidationWarnings
                                                        });
        }

        args.dataSource.validation = new DataSourceValidator(args.dataSource, validationWarnings, validationErrors);

        var exchange = args.view.getExchange();
        exchange.subscribe(messageTypes.onValidate, function (message) {
            if (message && message.dataSource === args.dataSource.getName()) {
                args.dataSource.validation.validate();
                args.dataSource.validation.notifyElements(message.property);
            }
        });
    }

}
