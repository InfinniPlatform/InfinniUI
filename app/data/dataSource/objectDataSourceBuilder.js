function ObjectDataSourceBuilder() {

    this.build = function (context, args){

        var dataSource = new ObjectDataSource(args.parent, args.metadata);
        new BaseDataSourceBuilder().build(context,
                                            _.extend(args, {dataSource: dataSource}));

        dataSource.setUserStrategy(new ItemsDataSourceStrategy(dataSource, args.metadata));

        return dataSource;
    }
}