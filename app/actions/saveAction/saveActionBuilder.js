function SaveActionBuilder() {
    this.build = function (context, args) {
        var parentView = args.parentView;
        var parentDataSource = parentView.getContext().dataSources[args.metadata.DataSource];
        var canClose = (args.metadata.CanClose === false) ? false: true;

        var action = new SaveAction(parentView);

        action.setProperty('parentDataSource', parentDataSource);
        action.setProperty('canClose', canClose);

        return action;
    }
}