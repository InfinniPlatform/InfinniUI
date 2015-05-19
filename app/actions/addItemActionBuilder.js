function AddItemActionBuilder(metadataView) {

    var baseItemActionBuilder = null;

    this.build = function(builder,parent,metadata){
        var action = new BaseItemActionBuilder(this.executeAction).build(builder,parent,metadata);

        var that = this;
        action.setAction(function (callback) {
            that.executeAction(builder, action, metadataView, callback);
        });

        return action;
    };

    this.executeAction = function (builder, action, metadata, callback) {

        var itemLinkView = builder.build(action.getView(), metadata.View);

        if (itemLinkView) {

            itemLinkView.createView(function (view) {
                var dataSources = view.getDataSources();

                var itemDataSource = null;
                if(dataSources.length > 0) {
                    itemDataSource = dataSources[0];
                }

                if(itemDataSource) {

                    itemDataSource.suspendUpdate();
                    itemDataSource.setEditMode();
                    itemDataSource.resumeUpdate();

                    view.onClosed(function(acceptResult){
                        if(acceptResult == dialogResult.accept) {

                            var newItem = itemDataSource.getSelectedItem();

                            if (newItem !== null) {

                                action.addItem(newItem);
                                action.setSelectedItem(newItem);
                                if (callback) {
                                    call(newItem);
                                }

                            }
                        }

                    });
                    view.open();
                }

            })
        }

    }
}