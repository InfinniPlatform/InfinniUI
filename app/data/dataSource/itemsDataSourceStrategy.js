function ItemsDataSourceStrategy(dataSource, metadata) {

    this.dataSource = dataSource;
    var strategy = this;
    var dataItems;

    dataSource.setDataItems(metadata.Items);

    this.getItems = function (dataProvider, resultCallback) {
        var textFilter = this.dataSource.getTextFilter();
        var filtered = [];
        if (false === _.isEmpty(textFilter) && _.isArray(dataItems)) {
            for (var i = 0, ln = dataItems.length; i < ln; i = i + 1) {
                if (JSON.stringify(dataItems[i]).indexOf(textFilter) === -1) continue;
                filtered.push(dataItems[i]);
            }
            resultCallback(filtered);
            return;
        }
        resultCallback(dataItems);
    };

    this.onItemsUpdated = function (value) {
        strategy.invokeEvent('onItemsUpdated', value);
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

    this.onTextFilterChanged = function (value) {
        strategy.invokeEvent('onTextFilterChanged', value);
    };

    this.setDataItems = function (value) {
        dataItems = value;
    };
}

ItemsDataSourceStrategy.prototype = BaseDataSourceStrategy.prototype;