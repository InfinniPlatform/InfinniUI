function UpdateActionBuilder() {
    this.build = function (context, args) {

        var parentDataSource = args.parentView.getContext().dataSources[args.metadata.DataSource];

        var action = new UpdateAction(args.parentView);

        action.setProperty('parentDataSource', parentDataSource);

        return action;
    }
}