function ObjectDataSourceBuilder() {

    this.build = function (builder, parent, metadata) {

        var dataSource = new ObjectDataSource(parent, metadata);
        new BaseDataSourceBuilder().build(metadata, dataSource, parent, builder);

        dataSource.setUserStrategy(new ItemsDataSourceStrategy(dataSource, metadata));

        return dataSource;
    }
}