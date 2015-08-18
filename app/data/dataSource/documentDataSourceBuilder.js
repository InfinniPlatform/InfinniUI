function DocumentDataSourceBuilder() {

    this.build = function (context, args){

        var idProperty = args.metadata.IdProperty;
        if (idProperty == undefined) {
            idProperty = 'Id';
        }
        var dataSource = new DocumentDataSource(args.parent, args.metadata);
        new BaseDataSourceBuilder().build(context,
                                            _.extend(args, {dataSource: dataSource}));

        return dataSource;
    }
}
