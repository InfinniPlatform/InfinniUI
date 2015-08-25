function SaveActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view),
            parentDataSource = args.view.getDataSource(args.metadata.DataSource),
            canClose = args.metadata.CanClose;
            canClose == undefined ? canClose = true : canClose = false;

        parentDataSource.onItemSaved(function (dataSourceName, value) {
            parentDataSource.setSelectedItem(value.value);
            if(canClose) {
                args.view.close(dialogResult.accept);
            }
        });

        action.setAction(function (callback) {
            var editItem = parentDataSource.getSelectedItem();
            var validation = parentDataSource.validation;
            var validate = validation.validate();

            if (validate === false) {
                validation.notifyElements();
            } else {
                parentDataSource.saveItem(editItem, callback);
            }
        });

        return action;
    }
}