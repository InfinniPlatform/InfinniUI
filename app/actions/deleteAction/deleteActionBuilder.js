function DeleteActionBuilder(){

}


_.extend(DeleteActionBuilder.prototype, {
    build: function(context, args){
        var dataSource = args.parentView.getDataSources()[args.metadata.DataSource];
        var accept = (args.metadata['Accept'] === false) ? false: true;

        var action = new DeleteAction(args.parentView);

        action.setProperty('accept', accept);
        action.setProperty('parentDataSource', dataSource);

        return action;
    }
});