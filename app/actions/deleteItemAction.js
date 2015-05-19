function DeleteItemActionBuilder() {

    var baseItemActionBuilder = null;

    var getConfirm = function (metadata) {
        var defer = $.Deferred();

        if (metadata.Accept) {
            defer.resolve();
        } else {
            new MessageBox({
                text: 'Вы уверены, что хотите удалить?',
                buttons: [
                    {
                        name: 'Да',
                        type: 'action',
                        onClick: function () {
                            defer.resolve();
                        }
                    },
                    {
                        name: 'Нет'
                    }
                ]
            });
        }

        return defer.promise();
    };


    this.build = function(builder, parent, metadata, collectionProperty){

        var action = new BaseItemActionBuilder(this.executeAction).build(builder,parent,metadata, collectionProperty);

        var that = this;
        action.setAction(function (callback) {
            if(collectionProperty){
                var baseIndex = collectionProperty.getBaseIndex();
                var items = action.getItems();
                action.setSelectedItem(items[baseIndex]);
            }

            that.executeAction(builder, action, metadata, callback, collectionProperty);
        });

        return action;
    };

    this.executeAction = function (builder, action, metadata, callback, itemBinding, collectionProperty) {

        var selectedItem = action.getSelectedItem();

        if(typeof selectedItem === undefined || selectedItem === null) {
            return;
        }

        getConfirm(metadata).then(function () {
            action.removeItem(selectedItem);
            if (typeof callback === 'function') {
                callback();
            }
        });

    };


}