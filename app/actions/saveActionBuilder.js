function SaveActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent),
            parentDataSource = parent.getDataSource(metadata.DataSource),
            canClose = metadata.CanClose;
            canClose == undefined ? canClose = true : canClose = false;

        parentDataSource.onItemSaved(function (dataSourceName, value) {
            if(canClose) {
                parent.close(dialogResult.accept);
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