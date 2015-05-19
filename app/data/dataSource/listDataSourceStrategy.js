function ListDataSourceStrategy(dataSource) {

    this.dataSource = dataSource;
    this.getItems = function (dataProvider, resultCallback) {

        var dataSource = this.dataSource;
        var callback = function () {
            var args = Array.prototype.slice.call(arguments);
            if (resultCallback) {
                resultCallback.apply(undefined, args);
            }
            dataSource.loadingProcessDone();
        };

        var criteriaList = dataSource.getPropertyFilters().slice();
        if (dataSource.getTextFilter()) {
            var fullTextSearchCriteria = {
                Property: '',
                CriteriaType: 65536, //full text search enumeration back-end service value
                Value: dataSource.getTextFilter()
            };
            criteriaList.push(fullTextSearchCriteria);
        }

        var queryFilter = dataSource.getQueryFilter();
        if (typeof queryFilter !== 'undefined'  && queryFilter !== null) {
            Array.prototype.push.apply(criteriaList, queryFilter.getAsArray());
        }

        var pageNumber = dataSource.getPageNumber();
        var pageSize = dataSource.getPageSize();

        dataProvider.getItems(criteriaList, pageNumber, pageSize, dataSource.getSorting(), callback);
    };

    this.bindItems = function (dataBinding, items, datasource) {
        var propertyName = dataBinding.getProperty();
        if (propertyName === '$') {
            dataBinding.bind(datasource.getSelectedItem());
        } else if (/^\$\..+$/.test(propertyName)) {
            dataBinding.bind(InfinniUI.ObjectUtils.getPropertyValue(datasource.getSelectedItem(), propertyName.substr(2)));
        } else if (propertyName !== null && typeof propertyName !== 'undefined') {
            dataBinding.bind(InfinniUI.ObjectUtils.getPropertyValue(items, propertyName));
        } else {
            dataBinding.bind(items);
        }
    };

    this.onPageNumberChanged = function (value) {
        strategy.invokeEvent('onPageNumberChanged', value);
    };

    this.onPageSizeChanged = function (value) {
        strategy.invokeEvent('onPageSizeChanged', value);
    };

    this.onPropertyFiltersChanged = function (value) {
        strategy.invokeEvent('onPropertyFiltersChanged', value);
    };

    this.onTextFilterChanged = function (value) {
        strategy.invokeEvent('onTextFilterChanged', value);
    };

    this.onItemSaved = function (value) {
        strategy.invokeEvent('onItemSaved', value);
    };

    this.onItemCreated = function (value) {
        strategy.invokeEvent('onItemCreated', value);
    };

    this.onItemDeleted = function (value) {
        strategy.invokeEvent('onItemDeleted', value);
    };

    this.onItemsUpdated = function (value) {
        strategy.invokeEvent('onItemsUpdated', value);
        strategy.restoreSelectedItem();
    };

    this.onError = function (value) {
        strategy.invokeEvent('onError', value);
    };

    this.restoreSelectedItem = function () {
        var ds = this.dataSource;
        var selectedItem = ds.getSelectedItem();
        var items = ds.getDataItems();
        if (!_.isEmpty(selectedItem)) {
            var idProperty = ds.getIdProperty();
            var id = InfinniUI.ObjectUtils.getPropertyValue(selectedItem, idProperty);
            var item = _.find(items, function (item) {
                return InfinniUI.ObjectUtils.getPropertyValue(item, idProperty) == id;
            });

            ds.setSelectedItem(item);
        }
    };

    var strategy = this;
}

ListDataSourceStrategy.prototype = BaseDataSourceStrategy.prototype;
