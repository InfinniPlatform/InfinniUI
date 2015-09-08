function DataSourceMessage(source, value, dataSource, property) {
    BaseMessage.call(this, source, value);
    this.dataSource = dataSource;
    this.property = property;
}
