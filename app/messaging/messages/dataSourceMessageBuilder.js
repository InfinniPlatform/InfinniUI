function DataSourceMessageBuilder() {

    this.build = function (builder, parent, metadata, collectionProperty, params) {
        params = params || {};
        if (typeof params.source === 'undefined' || params.source === null) {
            throw new Error('�� ������� ������������ �������� BaseMessage.source');
        }
        return new DataSourceMessage(params.source, params.value, params.dataSource, params.property);
    }
}
