function DocumentDataSourceBuilder() {

    this.build = function (builder, parent, metadata) {

        var idProperty = metadata.IdProperty;
        if (idProperty == undefined) {
            idProperty = 'Id';
        }
        var dataSource = new DocumentDataSource(parent, metadata);
        new BaseDataSourceBuilder().build(metadata, dataSource, parent, builder);

        return dataSource;
    }
}
