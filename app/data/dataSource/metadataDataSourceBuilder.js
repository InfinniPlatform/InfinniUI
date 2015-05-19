function MetadataDataSourceBuilder() {

    this.build = function (builder, parent, metadata) {

        var idProperty = metadata.IdProperty || 'Id';

        var dataSource = new MetadataDataSource(parent, metadata);
        new BaseDataSourceBuilder().build(metadata, dataSource, parent, builder);

        return dataSource;
    }
}
