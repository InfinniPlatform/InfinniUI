function AddActionBuilder() {
    this.build = function (builder, parent, metadata) {
        var action = new BaseAction(parent);
        action.setAction(function (callback) {
            var parentDataSource = parent.getDataSource(metadata.DataSource);
            if (parentDataSource != null) {
                var idProperty = parentDataSource.getIdProperty();
                if (idProperty) {
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
                                parentDataSource.updateItems();
                            });

                            editView.open();

                            if (callback) {
                                callback(editView);
                            }
                        });
                    }
                }
            }
        });

        return action;
    }
}