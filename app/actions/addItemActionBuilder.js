function AddItemActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseItemActionBuilder().build(builder, parent, metadata);
        action.setAction(function (callback) {
            var linkView = builder.build(parent, metadata.View);
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