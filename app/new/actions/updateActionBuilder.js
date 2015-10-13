function UpdateActionBuilder() {
    this.build = function (context, args) {
        var parentView = args.parentView;
        var parentDataSource = parentView.getDataSources()[args.metadata.DataSource];

        var action = new Action();

        action.setAction(function (callback) {
            parentDataSource.updateItems(callback, callback);
        });

        return action;
    }
}