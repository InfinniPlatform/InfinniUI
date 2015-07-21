function DocumentDataSourceBuilder() {

    this.build = function (context, args){

        var idProperty = args.metadata.IdProperty;
        if (idProperty == undefined) {
            idProperty = 'Id';
        }
        var dataSource = new DocumentDataSource(args.parent, args.metadata);
        new BaseDataSourceBuilder().build(args.metadata, dataSource, args.parent, args.builder);

        return dataSource;
    }
}
