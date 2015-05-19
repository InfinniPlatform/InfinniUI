function BaseDataSourceStrategy() {
}

BaseDataSourceStrategy.prototype.invokeEvent = function (eventName, value) {
    var context = this.dataSource.getView().getContext(),
        args = { value: value };

    this.dataSource.eventStore.executeEvent(eventName, context, args);
};

BaseDataSourceStrategy.prototype.syncSelectedItem = function (value) {
    return value;
};

BaseDataSourceStrategy.prototype.setDataItems = function (value) {
    return value;
};

BaseDataSourceStrategy.prototype.onSelectedItemChanged = function (value) {
    this.invokeEvent('onSelectedItemChanged', value);
};
