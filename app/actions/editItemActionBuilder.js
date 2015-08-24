function EditItemActionBuilder() {

    var baseItemActionBuilder = null;

    this.build = function (context, args) {

        var action = new BaseItemActionBuilder(this.executeAction).build(context, args);

        action.setAction(function (callback) {
            if(args.collectionProperty){
                var baseIndex = args.collectionProperty.getBaseIndex();
                var items = action.getItems();
                action.setSelectedItem(items[baseIndex]);
            }
            this.executeAction(args.builder, action, args.metadata, callback);
        }.bind(this));

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

                        //var copy = {};
                        //for(var property in selectedItem){
                        //
                        //    copy[property] = selectedItem[property];
                        //}


                        itemDataSource.setSelectedItem(_.clone(selectedItem));

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