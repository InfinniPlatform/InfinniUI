function AddItemActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseItemActionBuilder().build(context, args);
        action.setAction(function (callback) {
            var linkView = args.builder.build(args.view, args.metadata.View);
            if (linkView) {
                linkView.createView(function (editView) {
                    var itemDataSource = _.find(editView.getDataSources(), function (ds) {
                        return isMainDataSource(ds);
                    });

                    itemDataSource.suspendUpdate();
                    itemDataSource.setEditMode();
                    itemDataSource.resumeUpdate();

                    itemDataSource.updateItems();

                    editView.onClosed(function (acceptResult) {
                        if (acceptResult == dialogResult.accept) {
                            var newItem = itemDataSource.getSelectedItem();

                            if (newItem !== null) {
                                action.addItem(newItem);
                                action.setSelectedItem(newItem);
                            }
                        }
                    });

                    editView.open();

                    if (callback) {
                        callback(editView);
                    }
                });
            }
        });

        return action;
    }
}