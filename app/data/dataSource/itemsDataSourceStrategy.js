function ItemsDataSourceStrategy(dataSource, metadata) {

    this.dataSource = dataSource;
    var strategy = this;

    this.getItems = function (dataProvider, resultCallback) {
        resultCallback(metadata.Items);
    };

    this.onItemsUpdated = function (value) {
        strategy.invokeEvent('onItemsUpdated', value);
    };

    this.bindItems = function (dataBinding, items) {
//        dataBinding.bind(items);
    };

    this.onPageNumberChanged = function (value) {
        strategy.invokeEvent('onPageNumberChanged', value);
    };

    this.onPageSizeChanged = function (value) {
        strategy.invokeEvent('onPageSizeChanged', value);
    };
}

ItemsDataSourceStrategy.prototype = BaseDataSourceStrategy.prototype;