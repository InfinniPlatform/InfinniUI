function AddActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);
        action.setAction(function (callback) {
            var parentDataSource = parent.getDataSource(metadata.DataSource);
            var linkView = builder.build(parent, metadata.View);
            if (linkView) {
                linkView.createView(function (editView) {
                    var editDataSource = _.find(editView.getDataSources(), function (ds) {
                        return isMainDataSource(ds);
                    });

                    editDataSource.suspendUpdate();
                    editDataSource.setEditMode();
                    editDataSource.resumeUpdate();

                    editDataSource.updateItems();

                    editView.onClosed(function (closeResult) {
                        if (callback) {
                            if (closeResult == dialogResult.accept) {
                                callback(editDataSource.getDataItems()[0]);
                            } else {
                                callback(null);
                            }
                        }

                        if (parentDataSource != null) {
                            parentDataSource.updateItems();
                        }
                    });

                    editView.open();
                });
            }
        });

        return action;
    }
}