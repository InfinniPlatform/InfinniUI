function SaveActionBuilder() {
    this.build = function (context, args) {
        var parentView = args.parentView;
        var parentDataSource = parentView.getDataSources()[args.metadata.DataSource];
        var canClose = (args.metadata.CanClose === false) ? false: true;

        if(canClose) {
            parentDataSource.onItemSaved(function (context, args) {
                parentView.setDialogResult(DialogResult.accepted);
                parentView.close();
            });
        }


        var action = new Action();

        action.setAction(function (callback) {
            var selectedItem = parentDataSource.getSelectedItem();
            parentDataSource.saveItem(selectedItem, callback, callback);
        });

        return action;
    }
}