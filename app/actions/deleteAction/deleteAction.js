function DeleteAction(parentView){
    _.superClass(DeleteAction, this, parentView);
}

_.inherit(DeleteAction, BaseAction);


_.extend(DeleteAction.prototype,
    BaseFallibleActionMixin,
    {
        execute: function(callback){
            var accept = this.getProperty('accept');
            var that = this;
            var dataSource = this.getProperty('destinationSource');
            var property = this.getProperty('destinationProperty');
            var acceptMessage = this.getProperty('acceptMessage') || localized.strings.DeleteAction.warnMessage;
            var acceptMessageType = this.getProperty('acceptMessageType') || 'default';

            if( dataSource.getProperty(property) ) {
                if(accept){
                    new MessageBox({
                        text: acceptMessage,
                        type: acceptMessageType,
                        buttons: [
                            {
                                name: localized.strings.DeleteAction.agree,
                                type: 'action',
                                onClick: function() {
                                    that.remove(callback);
                                }
                            },
                            {
                                name: localized.strings.DeleteAction.disagree
                            }
                        ]
                    });
                } else {
                    this.remove(callback);
                }
            } else {
                new MessageBox({
                    text: localized.strings.DeleteAction.warnMessageNoItem,
	                  type: 'error',
                    buttons: [
                        {
                            name: localized.strings.DeleteAction.cancel
                        }
                    ]
                });
            }
        },

        remove: function (callback) {
            var dataSource = this.getProperty('destinationSource'),
                property = this.getProperty('destinationProperty');

            if( this._isRootElementPath(property) ) {
                this._deleteDocument(dataSource, property, callback);
            } else {
                this._deleteArrayElement(dataSource, property, callback);
            }
        },

        _deleteDocument: function(dataSource, property, callback){
            var that = this,
                onSuccessDelete = function (context, args) {
                    dataSource.updateItems();

                    that.onExecutedHandler(args);
                    that.onSuccessHandler(args);

                    if (_.isFunction(callback)) {
                        callback();
                    }
                },
                onErrorDelete = function(context, args){
                    that.onExecutedHandler(args);
                    that.onErrorHandler(args);

                    if (_.isFunction(callback)) {
                        callback();
                    }
                };

            var selectedItem = dataSource.getProperty(property);
            dataSource.deleteItem(selectedItem, onSuccessDelete, onErrorDelete);
        },

        _deleteArrayElement: function(dataSource, property, callback){
            var propertyPathList = property.split("."),
                index = propertyPathList.pop(),
                parentProperty = propertyPathList.join("."),
                items = dataSource.getProperty(parentProperty);

            items = _.clone( items );
            items.splice(index, 1);
            dataSource.setProperty(parentProperty, items);

            this.onExecutedHandler();
            this.onSuccessHandler();

            if (_.isFunction(callback)) {
                callback();
            }
        }
    }
);

window.InfinniUI.DeleteAction = DeleteAction;
