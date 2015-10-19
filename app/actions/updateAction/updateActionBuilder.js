function UpdateActionBuilder() {
    this.build = function (context, args) {

        var parentDataSource = args.parentView.getDataSources()[args.metadata.DataSource];

        var action = new UpdateAction(args.parentView);

        action.setProperty('parentDataSource', parentDataSource);

        return action;
    }
}