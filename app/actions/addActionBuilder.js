function AddActionBuilder() {
    this.build = function (context, args) {
        var action = new BaseAction(args.view);
        action.setAction(function (callback) {
            var parentDataSource = args.view.getDataSource(args.metadata.DataSource);
            var linkView = args.builder.build(args.metadata.View, {parentView: args.parentView});
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