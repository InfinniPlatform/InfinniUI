function oldDeleteItemActionBuilder() {

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


    this.build = function (context, args) {

        var action = new BaseItemActionBuilder(this.executeAction).build(context, args);

        var that = this;
        action.setAction(function (callback) {
            if(args.collectionProperty){
                var baseIndex = args.collectionProperty.getBaseIndex();
                var items = action.getItems();
                action.setSelectedItem(items[baseIndex]);
            }

            that.executeAction(args.builder, action, args.metadata, callback, args.collectionProperty);
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