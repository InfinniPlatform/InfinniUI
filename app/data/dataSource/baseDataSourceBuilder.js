function BaseDataSourceBuilder() {

    this.build = function (metadata, dataSource, parent, builder) {

        dataSource.suspendUpdate();
        dataSource.setName(metadata.Name);
        dataSource.setFillCreatedItem(metadata.FillCreatedItem);
        dataSource.setSorting(metadata.Sorting);
        dataSource.setPageSize(metadata.PageSize || 15);
        dataSource.setPageNumber(metadata.PageNumber || 1);

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

        this.initScriptsHandlers(parent, metadata, dataSource);

        buildValidation.apply(this, arguments);

        var exchange = parent.getExchange();
        exchange.subscribe(messageTypes.onLoading, function () {
            dataSource.resumeUpdate();
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

    this.initScriptsHandlers = function (parent, metadata, dataSource) {
        //Скриптовые обработчики на события
        if (parent) {
            dataSource.onSelectedItemChanged(function () {
                var exchange = parent.getExchange();
                exchange.send(messageTypes.onSelectedItemChanged, {
                    DataSource: dataSource.getName(),
                    Value: dataSource.getSelectedItem()
                });

                if (metadata.OnSelectedItemChanged) {
                    new ScriptExecutor(parent).executeScript(metadata.OnSelectedItemChanged.Name);
                }
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
