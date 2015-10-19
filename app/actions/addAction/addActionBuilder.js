function AddActionBuilder(){
    this.build = function(context, args){
        var action = new EditAction(args.parentView);

        var metadata = args.metadata;
        var parentView = args.parentView;
        var builder = args.builder;
        var dataSource = parentView.getDataSources()[metadata.DataSource];

        var linkView = builder.build(metadata['LinkView'], {parentView: parentView});

        action.setProperty('linkView', linkView);
        action.setProperty('parentDataSource', dataSource);

        return action;
    }
}