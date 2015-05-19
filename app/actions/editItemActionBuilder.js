function EditItemActionBuilder(metadataView) {

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

        var selectedItem = action.getSelectedItem();

        if(selectedItem) {

            var itemLinkView = builder.build(action.getView(), metadata.View);

            if (itemLinkView != null) {

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

                        var copy = {};
                        for(var property in selectedItem){

                            copy[property] = selectedItem[property];
                        }


                        itemDataSource.setSelectedItem(copy);

                        view.onClosed(function(acceptResult){
                            if(acceptResult == dialogResult.accept) {

                                var newItem = itemDataSource.getSelectedItem();

                                if (newItem !== null) {

                                    action.replaceItem(selectedItem, newItem);
                                    action.setSelectedItem(newItem);

                                }
                            }

                        });

                        if (callback) {
                            view.onLoaded(function () {
                                callback();
                            })
                        }
                        view.open();
                    }
                })
            }
        }
    }

}