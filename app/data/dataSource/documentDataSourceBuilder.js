function oldDocumentDataSourceBuilder() {

    this.build = function (context, args){

        var idProperty = args.metadata.IdProperty;
        if (idProperty == undefined) {
            idProperty = 'Id';
        }
        var dataSource = new DocumentDataSource(args.view, args.metadata);
        new BaseDataSourceBuilder().build(context,
                                            _.extend(args, {dataSource: dataSource}));

        return dataSource;
    }
}
