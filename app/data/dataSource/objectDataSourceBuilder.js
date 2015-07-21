function ObjectDataSourceBuilder() {

    this.build = function (context, args){

        var dataSource = new ObjectDataSource(args.parent, args.metadata);
        new BaseDataSourceBuilder().build(args.metadata, dataSource, args.parent, args.builder);

        dataSource.setUserStrategy(new ItemsDataSourceStrategy(dataSource, args.metadata));

        return dataSource;
    }
}