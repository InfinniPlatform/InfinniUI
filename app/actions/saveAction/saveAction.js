function SaveAction(parentView){
    _.superClass(SaveAction, this, parentView);
}

_.inherit(SaveAction, BaseAction);


_.extend(SaveAction.prototype,
    BaseFallibleActionMixin,
    {
        execute: function(callback){
            var parentView = this.parentView,
                dataSource = this.getProperty('dataSource'),
                canClose = this.getProperty('canClose'),
                that = this;

            var onSuccessSave = function(context, args){
                    if(canClose !== false){
                        parentView.setDialogResult(DialogResult.accepted);
                        parentView.close();
                    }

                    that.onExecutedHandler(args);
                    that.onSuccessHandler(args);

                    if(_.isFunction(callback)){
                        callback(context, args);
                    }
                },
                onErrorSave = function(context, args){
                    that.onExecutedHandler(args);
                    that.onErrorHandler(args);

                    if (_.isFunction(callback)) {
                        callback(context, args);
                    }
                };

            var selectedItem = dataSource.getSelectedItem();
            dataSource.saveItem(selectedItem, onSuccessSave, onErrorSave);
        }
    }
);

window.InfinniUI.SaveAction = SaveAction;
