function DocumentDataSourceBuilder() {

    this.build = function (builder, parent, metadata) {

        var idProperty = metadata.IdProperty;
        if (idProperty == undefined) {
            idProperty = 'Id';
        }
        var dataSource = new DocumentDataSource(parent, metadata);
        new BaseDataSourceBuilder().build(metadata, dataSource, parent, builder);

        attachEventHandlers(dataSource);
        return dataSource;
    };

    /**
     * Проброс событий от источника данных в глобальную шину событий
     * @param {BaseDataSource} datasource
     */
    function attachEventHandlers(dataSource) {
        var exchange = messageBus.getExchange('global');

        dataSource
            .on('OnDeleteItem', function (data) {
                exchange.send(messageTypes.onDeleteItem, {value: data, source: dataSource});
            })
            .on('OnSaveItem', function (data, params) {
                exchange.send(messageTypes.onSaveItem, {value: data, source: dataSource, isCreated: params.isCreated});
            });
    }
}
